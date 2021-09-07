import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { Subscription } from 'src/app/common/subscription';
import { SubscriptionItem } from 'src/app/common/subscription-item';
import { AdminService } from 'src/app/services/admin.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  storage: Storage = localStorage;
  isAdmin: boolean = false;
  imageUrl: SafeUrl = null;

  product: Product = new Product();

  constructor(private router: Router, private productService: ProductService, private route: ActivatedRoute, private cartService: CartService,  private subscriptionService: SubscriptionService, private adminService: AdminService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
    const email = JSON.parse(this.storage.getItem('userEmail'));
    if (email != null) {
      this.adminService.isAdmin(email).subscribe(
        result => {
          this.isAdmin = result;
        }
      )
    }
  }

  handleProductDetails() {
    const productId: number = +this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(productId).subscribe(
      data => {
        this.product = data;
        this.imageUrl = `data:${this.product.imageURL.type};base64,${this.product.imageURL.data}`;
      }
    )
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id);
    this.router.navigateByUrl('/products');
  }

  addToCart() {
    const cartItem = new CartItem(this.product);
    this.cartService.addToCart(cartItem);
  }

  addToSubscription(product: Product) {
    const item = new SubscriptionItem(product);
    console.log(item);
    let storeId: number;
    let subscriptions: Subscription[];
    const email = JSON.parse(this.storage.getItem('userEmail'));
    this.subscriptionService.getSubscriptions(email).subscribe((data) => {
      subscriptions = data;
      this.productService
        .getProductStoreForProductId(product.id)
        .subscribe((response) => {
          storeId = response;

          let storeSubscription: Subscription = null;
          for (let tempSubscription of subscriptions) {
            if (tempSubscription.storeId === storeId) {
              storeSubscription = tempSubscription;
            }
          }

          if (storeSubscription == null) {
            this.subscriptionService.getNewSubscription(email, storeId).subscribe( (data) => {
              storeSubscription = data;
              this.subscriptionService.addToSubscription(storeSubscription, item);
            })
          } else {
            this.subscriptionService.addToSubscription(storeSubscription, item);
          }
        });
    });
  }
}
