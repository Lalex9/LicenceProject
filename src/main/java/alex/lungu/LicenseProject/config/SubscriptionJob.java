package alex.lungu.LicenseProject.config;

import alex.lungu.LicenseProject.model.Subscription;
import alex.lungu.LicenseProject.service.SubscriptionService;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Configuration
@EnableScheduling
public class SubscriptionJob {
    private SubscriptionService subscriptionService;

    public SubscriptionJob(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

//    @Scheduled(cron = "0 0 0/1 * * ?")
    @Scheduled(cron = "0 * * * * *")
    public void launchAllSubscriptions() {
        placeOrderForSubscriptions();
    }

    @Transactional
    public void placeOrderForSubscriptions() {
        List<Subscription> subscriptions = subscriptionService.getAllSubscriptions();
        for (Subscription subscription: subscriptions) {
            if (subscription.getOrderDate().before(new Date(System.currentTimeMillis()))){
                subscriptionService.createOrder(subscription, true);
            }
        }
    }
}
