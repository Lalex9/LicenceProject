import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService {
  requestCount = 0;

  constructor(private spinnerService: NgxSpinnerService) { }

  busy() {
    this.requestCount++;
    this.spinnerService.show(undefined, {
      type: 'ball-pulse',
      bdColor: 'rgba(255,255,255,0.9)',
      color: '#333333'
    });
  }

  idle() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this.spinnerService.hide();
    }
  }
}
