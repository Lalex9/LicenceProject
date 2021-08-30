import { Component, OnInit } from '@angular/core';
import { ProductStore } from 'src/app/common/product-store';
import { Subscription } from 'src/app/common/subscription';
import { ProductService } from 'src/app/services/product.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  subscriptions: Subscription[] = [];
  storage: Storage = localStorage;
  productStores: ProductStore[];

  constructor(private subscriptionService : SubscriptionService, private productService: ProductService) { }

  ngOnInit(): void {
    this.handleStoreNames();
    this.handleSubscriptions();
  }

  handleStoreNames() {
    this.productService.getProductStores().subscribe(
      data => {
        this.productStores = data;
      }
    )
  }

  handleSubscriptions() {
    const email = JSON.parse(this.storage.getItem('userEmail'));

    this.subscriptionService.getSubscriptions(email).subscribe(
      data => {
        this.subscriptions = data;
      }
    );
  }

  getStoreName(storeId: number) {
    let store: ProductStore = this.productStores.find(store => store.id === storeId);
    return store.storeName;
  }

}
