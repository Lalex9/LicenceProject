package alex.lungu.LicenseProject.service;

import alex.lungu.LicenseProject.dto.Purchase;
import alex.lungu.LicenseProject.dto.PurchaseResponse;
import alex.lungu.LicenseProject.dto.SubscriptionUpdate;
import alex.lungu.LicenseProject.model.*;
import alex.lungu.LicenseProject.repository.*;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.*;

@Service
public class SubscriptionService {
    private SubscriptionRepository subscriptionRepository;
    private SubscriptionItemRepository subscriptionItemRepository;
    private ProductRepository productRepository;
    private StoreRepository storeRepository;
    private CheckoutService checkoutService;
    private CustomerRepository customerRepository;
    private CustomerDetailsService customerDetailsService;

    @PersistenceContext
    private EntityManager em;

    public SubscriptionService(SubscriptionRepository subscriptionRepository, ProductRepository productRepository, StoreRepository storeRepository, SubscriptionItemRepository subscriptionItemRepository, CheckoutService checkoutService, CustomerRepository customerRepository, CustomerDetailsService customerDetailsService) {
        this.subscriptionRepository = subscriptionRepository;
        this.productRepository = productRepository;
        this.storeRepository = storeRepository;
        this.subscriptionItemRepository = subscriptionItemRepository;
        this.checkoutService = checkoutService;
        this.customerRepository = customerRepository;
        this.customerDetailsService = customerDetailsService;
    }

    @Transactional
    public List<Subscription> getAllSubscriptions() {
        return subscriptionRepository.findAll();
    }

    @Transactional
    public PurchaseResponse createOrder(Long subscriptionId, boolean isScheduled) {
        Optional<Subscription> subscriptionOptional = getSubscription(subscriptionId);
        if (subscriptionOptional.isEmpty())
            return null;

        Subscription subscription = subscriptionOptional.get();
        return createOrder(subscription, isScheduled);
    }

    @Transactional
    public PurchaseResponse createOrder(Subscription subscription, boolean isScheduled) {
        Customer customer = customerRepository.findByEmail(subscription.getCustomerEmail());
        CustomerDetails customerDetails = customerDetailsService.getCustomerDetails(subscription.getCustomerEmail());
        if (customer == null) {
            customer = new Customer();
            customer.setEmail(customerDetails.getCustomerEmail());
            customer.setFirstName(customerDetails.getFirstName());
            customer.setLastName(customerDetails.getLastName());
        }
        Purchase purchase = new Purchase();
        purchase.setCustomer(customer);

        purchase.setShippingAddress(customerDetails.getShippingAddress());
        purchase.setBillingAddress(customerDetails.getBillingAddress());
        Set<OrderItem> orderItems = new HashSet<>();
        float totalPrice = 0;
        int totalQuantity = 0;
        for (SubscriptionItem subscriptionItem : subscription.getSubscriptionItems()) {
            OrderItem item = OrderItem.getOrderItemFromSubscriptionItem(subscriptionItem);
            System.out.println(item);
            orderItems.add(item);
            totalPrice += item.getUnitPrice().floatValue() * item.getQuantity();
            totalQuantity += item.getQuantity();
        }
        purchase.setOrderItems(orderItems);
        Order order = new Order();
        order.setStatus("Completed");
        order.setTotalPrice(new BigDecimal(totalPrice));
        order.setTotalQuantity(totalQuantity);
        purchase.setOrder(order);

        createSubscription(subscription, isScheduled);
        return checkoutService.placeOrder(purchase);
    }

    @Transactional
    public void updateSubscription(SubscriptionUpdate subscriptionUpdate) {
        Subscription subscription = getSubscription(subscriptionUpdate.getCustomerEmail(), subscriptionUpdate.getStoreId());
        deleteOldItems(subscription.getSubscriptionItems());
        setSubscription(subscriptionUpdate.getSubscriptionItems(), subscription);
        subscription.setSubscriptionItems(subscriptionUpdate.getSubscriptionItems());
        saveSubscription(subscription);
    }

    @Transactional
    public void deleteOldItems(Set<SubscriptionItem> items) {
        for (SubscriptionItem tempItem : items) {
            SubscriptionItem item = em.find(SubscriptionItem.class, tempItem.getId());
            em.remove(item);
        }
    }

    @Transactional
    public void setSubscription(Set<SubscriptionItem> items, Subscription subscription) {
        for (SubscriptionItem item : items) {
            item.setSubscription(subscription);
        }
    }

    @Transactional
    public void saveSubscription(Subscription subscription) {
        if (subscription.getSubscriptionItems().isEmpty()) {
            deleteSubscription(subscription);
            return;
        }
        subscriptionRepository.save(subscription);
    }

    @Transactional
    public void deleteSubscription(Subscription subscription) {
        Subscription subscriptionToDelete = em.find(Subscription.class, subscription.getId());
        if (subscriptionToDelete == null)
            return;

        em.remove(subscriptionToDelete);
    }

    @Transactional
    public Subscription createSubscription(String customerEmail, Long storeId) {
        Subscription subscription = new Subscription();
        subscription.setCustomerEmail(customerEmail);
        subscription.setStore(storeRepository.findById(storeId).get());

        Set<SubscriptionItem> items = new HashSet<>();
        subscription.setSubscriptionItems(items);

        Date date = new Date(System.currentTimeMillis());
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DATE, 7);
        date = calendar.getTime();
        subscription.setOrderDate(date);
        subscriptionRepository.save(subscription);

        return subscription;
    }

    @Transactional
    public Subscription createSubscriptionScheduled(Subscription oldSubscription) {
        return createSubscription(oldSubscription, true);
    }

    @Transactional
    public Subscription createSubscriptionInstant(Subscription oldSubscription) {
        return createSubscription(oldSubscription, false);
    }

    @Transactional
    public Subscription createSubscription(Subscription oldSubscription, boolean isScheduled) {
        Subscription subscription = new Subscription();
        subscription.setCustomerEmail(oldSubscription.getCustomerEmail());
        subscription.setStore(oldSubscription.getStore());

        Set<SubscriptionItem> items = new HashSet<>();
        for (SubscriptionItem oldItem : oldSubscription.getSubscriptionItems()) {
            SubscriptionItem newItem = new SubscriptionItem();
            newItem.setSubscription(subscription);
            newItem.setImageUrl(oldItem.getImageUrl());
            newItem.setQuantity(oldItem.getQuantity());
            newItem.setUnitPrice(oldItem.getUnitPrice());
            newItem.setProductId(oldItem.getProductId());
            items.add(newItem);
        }
        subscription.setSubscriptionItems(items);
        Calendar calendar = Calendar.getInstance();

        Date date = null;
        if (isScheduled) {
            date = oldSubscription.getOrderDate();
        } else {
            date = new Date(System.currentTimeMillis());
        }
        calendar.setTime(date);
        calendar.add(Calendar.DATE, 7);
        date = calendar.getTime();
        subscription.setOrderDate(date);
        saveSubscription(subscription);
        deleteSubscription(oldSubscription);

        return  subscription;
    }

    @Transactional
    public Subscription getSubscription(String customerEmail, Long storeId) {
        Subscription subscription = subscriptionRepository.findByCustomerEmailAndStoreId(customerEmail, storeId);

        if (subscription == null) {
            subscription = createSubscription(customerEmail, storeId);
        }

        return subscription;
    }

    @Transactional
    public Optional<Subscription> getSubscription(Long id) {
        Optional<Subscription> subscription = subscriptionRepository.findById(id);

        return subscription;
    }

    @Transactional
    public Set<Subscription> getSubscriptionsByEmail(String email) {
        return subscriptionRepository.findByCustomerEmail(email);
    }

//    @Transactional
//    public Subscription addToSubscription(SubscriptionItem subscriptionItem, String customerEmail) {
//        Optional<Product> product = productRepository.findProductById(subscriptionItem.getProductId());
//        if (!product.isPresent())
//            return null;
//
//        Subscription subscription = subscriptionRepository.findByCustomerEmailAndStoreId(customerEmail, product.get().getStore().getId());
//        if (subscription == null) {
//            subscription = new Subscription();
//            subscription.setCustomerEmail(customerEmail);
//            subscription.setStore(product.get().getStore());
//
//            Set<SubscriptionItem> items = new HashSet<>();
//            items.add(subscriptionItem);
//            subscription.setSubscriptionItems(items);
//
//            Date date = new Date(System.currentTimeMillis());
//            Calendar calendar = Calendar.getInstance();
//            calendar.setTime(date);
//            calendar.add(Calendar.DATE, 7);
//            date = calendar.getTime();
//            subscription.setOrderDate(date);
//        } else {
//            Set<SubscriptionItem> items = subscription.getSubscriptionItems();
//            SubscriptionItem item = null;
//            for (SubscriptionItem tempItem : items) {
//                if (tempItem.getId().equals(subscriptionItem.getId())){
//                    item = tempItem;
//                    break;
//                }
//            }
//            if (item == null) {
//                item =
//            }
//        }
//
//        return new Subscription();
//    }
}
