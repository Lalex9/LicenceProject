package alex.lungu.LicenseProject.repository;

import alex.lungu.LicenseProject.model.CustomerDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerDetailRepository extends JpaRepository<CustomerDetails, Long> {
    CustomerDetails findByCustomerEmail(String customerEmail);
}
