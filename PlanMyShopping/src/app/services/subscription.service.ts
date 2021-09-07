import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Subscription } from '../common/subscription';
import { SubscriptionItem } from '../common/subscription-item';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private baseUrl = environment.planMyShoppingApiUrl + '/subscription';

  constructor(private httpClient: HttpClient, private router: Router) { }

  orderNow(id: number){
    const orderUrl = `${this.baseUrl}/order?subscriptionId=${id}`;
    this.httpClient.post(orderUrl, null).subscribe();
    this.router.navigateByUrl("/subscriptions");
  }

  getSubscriptions(email: string): Observable<Subscription[]> {
    const subscriptionUrl = `${this.baseUrl}/findByCustomerEmail?email=${email}`;
    return this.httpClient.get<Subscription[]>(subscriptionUrl);
  }

  getSubscription(subscriptionId: number) : Observable<Subscription> {
    const subscriptionUrl = `${this.baseUrl}/get?id=${subscriptionId}`;
    return this.httpClient.get<Subscription>(subscriptionUrl);
  }

  getNewSubscription(customerEmail: string, storeId: number) : Observable<Subscription> {
    const subscriptionUrl = `${this.baseUrl}/new?customerEmail=${customerEmail}&storeId=${storeId}`;
    return this.httpClient.post<Subscription>(subscriptionUrl, null);
  }

  persistSubscription(subscription: Subscription) {
    const saveSubscriptionUrl = `${this.baseUrl}/update`;

    this.httpClient.post<Subscription>(saveSubscriptionUrl, subscription).subscribe();
  }

  addToSubscription(subscription: Subscription, subscriptionItem: SubscriptionItem) {
    let productExistsInSubscription: boolean = false;
    let existingSubscriptionItem: SubscriptionItem = undefined;

    console.log(subscription.subscriptionItems);
    if (subscription.subscriptionItems.length > 0) {
      existingSubscriptionItem = subscription.subscriptionItems.find(tempSubscriptionItem => tempSubscriptionItem.productId === subscriptionItem.productId);

      productExistsInSubscription = (existingSubscriptionItem != undefined);
    }

    if (productExistsInSubscription) {
      existingSubscriptionItem.quantity++;
    } else {
      subscription.subscriptionItems.push(subscriptionItem);
    }
    subscriptionItem.id = null;
    console.log(subscription);
    console.log(subscriptionItem);

    this.persistSubscription(subscription);
  }

  decrementQuantity(subscription: Subscription, subscriptionItem: SubscriptionItem) {
    subscriptionItem.quantity--;
    if (subscriptionItem.quantity === 0) {
      this.remove(subscription, subscriptionItem);
    } else {
      this.persistSubscription(subscription);
    }
  }

  remove(subscription: Subscription, subscriptionItem: SubscriptionItem) {
    const itemIndex = subscription.subscriptionItems.findIndex(tempSubscriptionItem => tempSubscriptionItem.id === subscriptionItem.id);

    if (itemIndex > -1) {
      subscription.subscriptionItems.splice(itemIndex, 1);

      this.persistSubscription(subscription);
    }
  }
}
