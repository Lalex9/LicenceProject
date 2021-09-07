import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Image } from '../common/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private imagesUrl = environment.planMyShoppingApiUrl + '/images';

  constructor(private httpClient: HttpClient) { }

  getImage(productId: string): Observable<Image> {
    const productImageUrl = this.imagesUrl + '/' + productId;
    return this.httpClient.get<Image>(productImageUrl);
  }
}
