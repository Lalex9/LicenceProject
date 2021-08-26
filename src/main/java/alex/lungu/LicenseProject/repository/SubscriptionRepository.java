package alex.lungu.LicenseProject.repository;

import alex.lungu.LicenseProject.model.Order;
import alex.lungu.LicenseProject.model.Subscription;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Set;

@RepositoryRestResource
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Set<Subscription> findByCustomerEmail(@Param("email") String email);
    Subscription findByCustomerEmailAndStoreId(@Param("email") String email, @Param("store_id") Long storeId);
}
