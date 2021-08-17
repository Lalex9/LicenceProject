import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/categories';

  constructor(private httpClient: HttpClient) { }

  getProduct(productId: number) : Observable<Product> {
    const productUrl = `${this.baseUrl}/${productId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProducts(searchUrl: string) : Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductList(categoryId: number) : Observable<Product[]> {
    const searchUrl =`${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    
    return this.getProducts(searchUrl);
  }
  
  getProductCategories() : Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.categories)
    );
  }

  searchProducts(searchKeyword: string) : Observable<Product[]> {
    const searchUrl =`${this.baseUrl}/search/findByNameContaining?name=${searchKeyword}`;

    return this.getProducts(searchUrl);
  }
}

interface GetResponseProducts {
  _embedded : {
    products: Product[];
  }
}

interface GetResponseProductCategory {
  _embedded : {
    categories: ProductCategory[];
  }
}
