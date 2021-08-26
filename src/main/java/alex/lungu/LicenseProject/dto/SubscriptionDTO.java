package alex.lungu.LicenseProject.dto;

import alex.lungu.LicenseProject.model.Store;
import alex.lungu.LicenseProject.model.Subscription;
import alex.lungu.LicenseProject.model.SubscriptionItem;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
public class SubscriptionDTO {
    private Long id;
    private String customerEmail;
    private Long storeId;
    private Set<SubscriptionItem> subscriptionItems = new HashSet<>();
    private Date orderDate;

    public SubscriptionDTO(Subscription subscription) {
        this.id = subscription.getId();
        this.customerEmail = subscription.getCustomerEmail();
        this.storeId = subscription.getStore().getId();
        this.orderDate = subscription.getOrderDate();
        this.subscriptionItems = subscription.getSubscriptionItems();
    }
}
