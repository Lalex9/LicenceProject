package alex.lungu.LicenseProject.controllers;

import alex.lungu.LicenseProject.dto.Purchase;
import alex.lungu.LicenseProject.dto.PurchaseResponse;
import alex.lungu.LicenseProject.dto.SubscriptionDTO;
import alex.lungu.LicenseProject.dto.SubscriptionUpdate;
import alex.lungu.LicenseProject.model.Subscription;
import alex.lungu.LicenseProject.model.SubscriptionItem;
import alex.lungu.LicenseProject.service.CheckoutService;
import alex.lungu.LicenseProject.service.SubscriptionService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/subscription")
public class SubscriptionController {
    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @GetMapping("/get")
    public ResponseEntity<SubscriptionDTO> getSubscription(@RequestParam("id") Long id) {
        Optional<Subscription> subscription = this.subscriptionService.getSubscription(id);
        if (subscription.isPresent()) {
            return new ResponseEntity<>(new SubscriptionDTO(subscription.get()), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/findByCustomerEmail")
    public ResponseEntity<Set<SubscriptionDTO>> getSubscription(@RequestParam("email") String email) {
        Set<Subscription> subscriptions = this.subscriptionService.getSubscriptionsByEmail(email);
        Set<SubscriptionDTO> response = new HashSet<>();
        for (Subscription subscription : subscriptions) {
            response.add(new SubscriptionDTO(subscription));
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateSubscription(@RequestBody SubscriptionUpdate subscriptionUpdate) {
        subscriptionService.updateSubscription(subscriptionUpdate);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
