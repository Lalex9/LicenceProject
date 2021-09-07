import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductStore } from '../common/product-store';
import { environment } from 'src/environments/environment';
import { ProductUpload } from '../components/new-product/new-product.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.planMyShoppingApiUrl + '/products';
  private storeUrl = environment.planMyShoppingApiUrl + '/store';
  private imagesUrl = environment.planMyShoppingApiUrl + '/images';

  constructor(private httpClient: HttpClient, private router: Router) { }

  getProduct(productId: number) : Observable<Product> {
    const productUrl = `${this.baseUrl}/${productId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProducts(searchUrl: string) : Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductStoreForProductId(productId: string): Observable<number> {
    const storeIdUrl =  `${this.storeUrl}/${productId}`;
    return this.httpClient.get<number>(storeIdUrl);
  }
  
  getProductStores() : Observable<ProductStore[]> {
    return this.httpClient.get<GetResponseProductStore>(this.storeUrl + 's').pipe(
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

  saveImage(file: File) : Observable<any> {
    let formData = new FormData(); 
    formData.append("file", file, file.name);
    return this.httpClient.post<number>(this.imagesUrl, formData);
  }

  saveProduct(productUpload: ProductUpload) {
    this.httpClient.post<Product>(this.baseUrl, productUpload).subscribe(
      result => {
        this.router.navigateByUrl(`/products/${result.id}`);
      }
    );
  }

  deleteProduct(productId: string) {
    const deleteUrl =`${this.baseUrl}/${productId}`;
    return this.httpClient.delete(deleteUrl).subscribe();
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

interface ImageResponse {
  productUpload: ProductUpload;
  formData: FormData;
}
