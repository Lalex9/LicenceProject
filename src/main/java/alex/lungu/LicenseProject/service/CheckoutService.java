package alex.lungu.LicenseProject.service;

import alex.lungu.LicenseProject.dto.Purchase;
import alex.lungu.LicenseProject.dto.PurchaseResponse;
import alex.lungu.LicenseProject.model.Customer;
import alex.lungu.LicenseProject.model.Order;
import alex.lungu.LicenseProject.model.OrderItem;
import alex.lungu.LicenseProject.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutService {
    private CustomerRepository customerRepository;
    
    public CheckoutService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }
    
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        Order order = purchase.getOrder();
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(order::add);

        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        Customer customer = purchase.getCustomer();
        customer.add(order);

        customerRepository.save(customer);
        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
        return UUID.randomUUID().toString();
    }
}
