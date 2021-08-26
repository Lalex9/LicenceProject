package alex.lungu.LicenseProject.dto;

import alex.lungu.LicenseProject.model.SubscriptionItem;
import lombok.Data;

import java.util.Set;

@Data
public class SubscriptionUpdate {
    private String customerEmail;
    private Long storeId;
    private Set<SubscriptionItem> subscriptionItems;
}
