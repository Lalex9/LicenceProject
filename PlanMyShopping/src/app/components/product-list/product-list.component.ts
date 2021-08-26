import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[] = [];
  currentStoreId: number = 1;
  previousStoreId: number = 1;
  searchMode: boolean = false;

  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;

  previousKeyword: string = null;

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
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
    }
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.listProducts();
  }

  addToCart(product: Product) {
    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }
}
