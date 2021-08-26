package alex.lungu.LicenseProject.repository;

import alex.lungu.LicenseProject.model.SubscriptionItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface SubscriptionItemRepository extends JpaRepository<SubscriptionItem, Long> {
    public void deleteBySubscriptionId(@Param("subscriptionId") Long subscriptionId);
}
