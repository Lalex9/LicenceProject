import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private adminUrl = environment.planMyShoppingApiUrl + '/admin';

  constructor(private httpClient: HttpClient) { }

  isAdmin(adminEmail: string): Observable<boolean> {
    const isAdminUrl = this.adminUrl + '/' + adminEmail;
    return this.httpClient.get<boolean>(isAdminUrl);
  }
}
