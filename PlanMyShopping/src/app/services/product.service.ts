import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.planMyShoppingApiUrl + '/products';
  private categoryUrl = environment.planMyShoppingApiUrl + '/categories';

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

  getProductListPaginate(page: number, pageSize: number, categoryId: number) : Observable<GetResponseProducts> {
    const searchUrl =`${this.baseUrl}/search/findByCategoryId?id=${categoryId}` + `&page=${page}&size=${pageSize}`;
    
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  searchProducts(searchKeyword: string) : Observable<Product[]> {
    const searchUrl =`${this.baseUrl}/search/findByNameContaining?name=${searchKeyword}`;

    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(page: number, pageSize: number, searchKeyword: string) : Observable<GetResponseProducts> {
    const searchUrl =`${this.baseUrl}/search/findByNameContaining?name=${searchKeyword}` + `&page=${page}&size=${pageSize}`;
    
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
}

interface GetResponseProducts {
  _embedded : {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number;
  }
}

interface GetResponseProductCategory {
  _embedded : {
    categories: ProductCategory[];
  }
}
