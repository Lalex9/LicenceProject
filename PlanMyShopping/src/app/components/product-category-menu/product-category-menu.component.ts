import { Component, OnInit } from '@angular/core';
import { ProductStore } from 'src/app/common/product-store';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {
  productStores: ProductStore[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProductStores();
  }

  listProductStores() {
    this.productService.getProductStores().subscribe(
      data => {
        this.productStores = data;
      }
    )
  }

}
