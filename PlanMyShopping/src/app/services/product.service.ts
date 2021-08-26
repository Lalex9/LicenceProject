import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductStore } from '../common/product-store';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.planMyShoppingApiUrl + '/products';
  private storeUrl = environment.planMyShoppingApiUrl + '/stores';

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

  getProductList(storeId: number) : Observable<Product[]> {
    const searchUrl =`${this.baseUrl}/search/findByStoreId?id=${storeId}`;
    
    return this.getProducts(searchUrl);
  }
  
  getProductStores() : Observable<ProductStore[]> {
    return this.httpClient.get<GetResponseProductStore>(this.storeUrl).pipe(
      map(response => response._embedded.stores)
    );
  }

  getProductListPaginate(page: number, pageSize: number, storeId: number) : Observable<GetResponseProducts> {
    const searchUrl =`${this.baseUrl}/search/findByStoreId?id=${storeId}` + `&page=${page}&size=${pageSize}`;
    
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

interface GetResponseProductStore {
  _embedded : {
    stores: ProductStore[];
  }
}
