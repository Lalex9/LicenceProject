package alex.lungu.LicenseProject.controllers;

import alex.lungu.LicenseProject.dto.Purchase;
import alex.lungu.LicenseProject.dto.PurchaseResponse;
import alex.lungu.LicenseProject.model.CustomerDetails;
import alex.lungu.LicenseProject.service.CustomerDetailsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer-details")
public class CustomerDetailsController {
    private CustomerDetailsService customerDetailsService;

    public CustomerDetailsController(CustomerDetailsService customerDetailsService) {
        this.customerDetailsService = customerDetailsService;
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveDetails(@RequestBody CustomerDetails customerDetails) {
        customerDetailsService.saveCustomerDetails(customerDetails);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/get")
    public ResponseEntity<CustomerDetails> getDetails(@RequestParam("customerEmail") String userEmail) {
        CustomerDetails customersDetails = customerDetailsService.getCustomerDetails(userEmail);
        if (customersDetails != null) {
            return new ResponseEntity<>(customersDetails, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
