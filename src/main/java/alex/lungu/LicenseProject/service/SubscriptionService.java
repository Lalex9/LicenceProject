package alex.lungu.LicenseProject.service;

import alex.lungu.LicenseProject.dto.SubscriptionUpdate;
import alex.lungu.LicenseProject.model.Subscription;
import alex.lungu.LicenseProject.model.SubscriptionItem;
import alex.lungu.LicenseProject.repository.ProductRepository;
import alex.lungu.LicenseProject.repository.StoreRepository;
import alex.lungu.LicenseProject.repository.SubscriptionItemRepository;
import alex.lungu.LicenseProject.repository.SubscriptionRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.*;

@Service
public class SubscriptionService {
    private SubscriptionRepository subscriptionRepository;
    private SubscriptionItemRepository subscriptionItemRepository;
    private ProductRepository productRepository;
    private StoreRepository storeRepository;

    @PersistenceContext
    private EntityManager em;

    public SubscriptionService(SubscriptionRepository subscriptionRepository, ProductRepository productRepository, StoreRepository storeRepository, SubscriptionItemRepository subscriptionItemRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.productRepository = productRepository;
        this.storeRepository = storeRepository;
        this.subscriptionItemRepository = subscriptionItemRepository;
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
        subscriptionRepository.save(subscription);
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

        return subscription;
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
