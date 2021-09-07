package alex.lungu.LicenseProject.service;

import alex.lungu.LicenseProject.repository.AdminRepository;
import alex.lungu.LicenseProject.repository.CustomerDetailRepository;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    private AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public boolean isAdmin(String email) {
        return adminRepository.findByEmail(email) != null;
    }
}
