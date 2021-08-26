package alex.lungu.LicenseProject.config;

import alex.lungu.LicenseProject.model.Subscription;
import alex.lungu.LicenseProject.service.SubscriptionService;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.Date;

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
//        subscriptionService.launchOrders();
    }
}
