import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Subscription } from '../common/subscription';
import { SubscriptionItem } from '../common/subscription-item';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private baseUrl = environment.planMyShoppingApiUrl + '/subscription';

  constructor(private httpClient: HttpClient) { }

  getSubscriptions(email: string): Observable<Subscription[]> {
    const subscriptionUrl = `${this.baseUrl}/findByCustomerEmail?email=${email}`;
    console.log(subscriptionUrl);

    return this.httpClient.get<Subscription[]>(subscriptionUrl);
  }

  getSubscription(subscriptionId: number) : Observable<Subscription> {
    const subscriptionUrl = `${this.baseUrl}/get?id=${subscriptionId}`;

    return this.httpClient.get<Subscription>(subscriptionUrl);
  }

  persistSubscription(subscription: Subscription) {
    const saveSubscriptionUrl = `${this.baseUrl}/update`;

    this.httpClient.post<Subscription>(saveSubscriptionUrl, subscription).subscribe();
  }

  addToSubscription(subscription: Subscription, subscriptionItem: SubscriptionItem) {
    let productExistsInSubscription: boolean = false;
    let existingSubscriptionItem: SubscriptionItem = undefined;

    if (subscription.subscriptionItems.length > 0) {
      existingSubscriptionItem = subscription.subscriptionItems.find(tempSubscriptionItem => tempSubscriptionItem.id === subscriptionItem.id);

      productExistsInSubscription = (existingSubscriptionItem != undefined);
    }

    if (productExistsInSubscription) {
      existingSubscriptionItem.quantity++;
    } else {
      subscription.subscriptionItems.push(subscriptionItem);
    }

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
