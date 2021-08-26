import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { delay, finalize } from "rxjs/operators";
import { LoadingIndicatorService } from "../services/loading-indicator.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor{
    constructor(private loadingService: LoadingIndicatorService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingService.busy();
        return next.handle(req).pipe(
            delay(500),
            finalize(() => {
                this.loadingService.idle();
            }
        ));
    }
}
