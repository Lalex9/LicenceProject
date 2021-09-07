import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes, RouterModule, Router } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';

import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard
} from '@okta/okta-angular';

import myAppConfig from './config/my-app-config';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { SubscriptionDetailsComponent } from './components/subscription-details/subscription-details.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './common/loading-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { NewProductComponent } from './components/new-product/new-product.component';

const oktaConfig = Object.assign({
  onAuthRequired: (injector) => {
    const router = injector.get(Router);

    router.navigate(['/login']);
  }
}, myAppConfig.oidc);

const routes: Routes = [
  {path: 'add-product', component: NewProductComponent, canActivate: [OktaAuthGuard]},
  {path: 'customer-details', component: CustomerDetailsComponent, canActivate: [OktaAuthGuard]},
  {path: 'subscriptions/:id', component: SubscriptionDetailsComponent, canActivate: [OktaAuthGuard]},
  {path: 'subscriptions', component: SubscriptionComponent, canActivate: [OktaAuthGuard]},
  {path: 'order-history/:id', component: OrderDetailsComponent, canActivate: [OktaAuthGuard]},
  {path: 'order-history', component: OrderHistoryComponent, canActivate: [OktaAuthGuard]},
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'store/:id', component: ProductListComponent},
  {path: 'store', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
]
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    OrderHistoryComponent,
    SubscriptionComponent,
    SubscriptionDetailsComponent,
    CustomerDetailsComponent,
    OrderDetailsComponent,
    NewProductComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [ProductService, {provide: OKTA_CONFIG, useValue: oktaConfig}, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
              {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
