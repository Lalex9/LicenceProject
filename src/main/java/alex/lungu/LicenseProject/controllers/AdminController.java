package alex.lungu.LicenseProject.controllers;


import alex.lungu.LicenseProject.model.Product;
import alex.lungu.LicenseProject.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/{email}")
    public ResponseEntity<Boolean> isAdmin(@PathVariable("email") String email) {
        boolean isAdmin = adminService.isAdmin(email);
        return new ResponseEntity<>(isAdmin, HttpStatus.OK);
    }
}
