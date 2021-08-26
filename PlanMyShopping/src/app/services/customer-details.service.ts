import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerDetails } from '../common/customer-details';

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {
  private detailsUrl = environment.planMyShoppingApiUrl + '/customer-details';

  constructor(private httpClient: HttpClient) { }
  
  saveDetails(customerDetails: CustomerDetails): Observable<any> {
    const saveDetailsUrl = this.detailsUrl + '/save';

    return this.httpClient.post<CustomerDetails>(saveDetailsUrl, customerDetails);
  }

  getDetails(customerEmail: any): Observable<CustomerDetails> {
    const getDetailsUrl = this.detailsUrl + '/get?customerEmail=' + customerEmail;
    return this.httpClient.get<CustomerDetails>(getDetailsUrl);
  }
}
