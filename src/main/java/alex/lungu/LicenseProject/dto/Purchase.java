package alex.lungu.LicenseProject.dto;

import alex.lungu.LicenseProject.model.Address;
import alex.lungu.LicenseProject.model.Customer;
import alex.lungu.LicenseProject.model.Order;
import alex.lungu.LicenseProject.model.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
