import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Image } from 'src/app/common/image';
import { Product } from 'src/app/common/product';
import { Subscription } from 'src/app/common/subscription';
import { SubscriptionItem } from 'src/app/common/subscription-item';
import { AdminService } from 'src/app/services/admin.service';
import { CartService } from 'src/app/services/cart.service';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  isAdmin: boolean = false;
  
  storage: Storage = localStorage;

  products : Product[] = [];
  images: Map<Product, Image> = new Map();
  currentStoreId: number = 1;
  previousStoreId: number = 1;
  searchMode: boolean = false;

  pageNumber: number = 1;
  pageSize: number = 8;
  totalElements: number = 0;

  previousKeyword: string = null;

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService, private subscriptionService: SubscriptionService, private adminService: AdminService, private imageService: ImageService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
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

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }


  handleSearchProducts() {
    const searchKeyword: string = this.route.snapshot.paramMap.get('keyword');

    if (this.previousKeyword != searchKeyword) {
      this.pageNumber = 1;
    }

    this.previousKeyword = searchKeyword;
    
    this.productService.searchProductsPaginate(this.pageNumber - 1, this.pageSize, searchKeyword).subscribe(this.processResult());
  }

  handleListProducts() {
    const hasStoreId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasStoreId) {
      this.currentStoreId = +this.route.snapshot.paramMap.get('id');
    } else {
      this.currentStoreId = 1;
    }
    
    if (this.previousStoreId != this.currentStoreId) {
      this.pageNumber = 1;
    }

    this.previousStoreId = this.currentStoreId;

    this.productService.getProductListPaginate(this.pageNumber - 1, this.pageSize, this.currentStoreId).subscribe(this.processResult());
  }

  processResult() {
    return data => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
      for (let product of this.products) {
        this.imageService.getImage(product.id).subscribe(
          image => {
            this.images.set(product, image);
          }
        );
      }
    }
  }

  getImageFromProduct(product: Product): string {
    let image = this.images.get(product);
    return `data:${image.type};base64,${image.data}`;
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.listProducts();
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

