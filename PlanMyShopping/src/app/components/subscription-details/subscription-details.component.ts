import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'src/app/common/subscription';
import { SubscriptionItem } from 'src/app/common/subscription-item';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-subscription-details',
  templateUrl: './subscription-details.component.html',
  styleUrls: ['./subscription-details.component.css']
})
export class SubscriptionDetailsComponent implements OnInit {

  subscription: Subscription;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private subscriptionService: SubscriptionService,  private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleSubscription();
    });
  }

  orderNow(id: number) {
    this.subscriptionService.orderNow(id);
    this.router.navigateByUrl("/subscriptions");
  }

  handleSubscription() {
    const subscriptionId: number = +this.route.snapshot.paramMap.get('id');

    this.subscriptionService.getSubscription(subscriptionId).subscribe(
      data => {
        this.subscription = data;
        this.calculateTotalPriceAndQuanity(data);
        console.log(this.subscription);
      }
    )
  }
  
  calculateTotalPriceAndQuanity(subscription: Subscription) {
    this.totalPrice = 0;
    this.totalQuantity = 0;

    for (let item of subscription.subscriptionItems) {
      this.totalPrice += item.quantity * item.unitPrice;
      this.totalQuantity += item.quantity;
    }
  }

  // listCartDetails() {
  //   this.cartItems = this.subscriptionService.getSubscriptions;

  //   this.cartService.totalPrice.subscribe(
  //     data => this.totalPrice = data
  //   );

  //   this.cartService.totalQuantity.subscribe(
  //     data => this.totalQuantity =data
  //   );

  //   this.cartService.computeCartTotals();
  // }

  incrementQuantity(subscriptionItem: SubscriptionItem) {
    this.subscriptionService.addToSubscription(this.subscription, subscriptionItem);
  }

  decrementQuantity(subscriptionItem: SubscriptionItem) {
    this.subscriptionService.decrementQuantity(this.subscription, subscriptionItem);
  }

  remove(subscriptionItem: SubscriptionItem) {
    this.subscriptionService.remove(this.subscription, subscriptionItem);
  }

}

