package alex.lungu.LicenseProject.repository;

import alex.lungu.LicenseProject.model.Admin;
import alex.lungu.LicenseProject.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByEmail(String email);
}
