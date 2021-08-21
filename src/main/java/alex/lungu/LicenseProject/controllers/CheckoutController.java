package alex.lungu.LicenseProject.controllers;

import alex.lungu.LicenseProject.dto.Purchase;
import alex.lungu.LicenseProject.dto.PurchaseResponse;
import alex.lungu.LicenseProject.service.CheckoutService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
    private final CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {
        return checkoutService.placeOrder(purchase);
    }
}
