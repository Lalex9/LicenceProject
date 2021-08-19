package alex.lungu.LicenseProject.repository;

import alex.lungu.LicenseProject.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
