import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { provideHttpClient, withInterceptors } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AddtocartComponent } from "./components/addtocart/addtocart.component";
import { BookCardComponent } from "./components/book-card/book-card.component";
import { BookDetailsComponent } from "./components/book-details/book-details.component";
import { BookFilterComponent } from "./components/book-filter/book-filter.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { LoginComponent } from "./components/login/login.component";
import { MyOrdersComponent } from "./components/my-orders/my-orders.component";
import { UserRegistrationComponent } from "./components/user-registration/user-registration.component";
import { HomeComponent } from "./components/home/home.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { ShoppingcartComponent } from "./components/shoppingcart/shoppingcart.component";
import { SimilarbooksComponent } from "./components/similarbooks/similarbooks.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

import { HttpInterceptorService } from "./interceptors/http-interceptor.service";
import { ErrorInterceptorService } from "./interceptors/error-interceptor.service";

import { NgMaterialModule } from "./ng-material/ng-material.module";
import { AppRoutingModule } from "./app-routing.module";
import { PriceFilterComponent } from "./components/price-filter/price-filter.component";
import { SearchComponent } from "./components/search/search.component";
import { AddtowishlistComponent } from "./components/addtowishlist/addtowishlist.component";
import { WishlistComponent } from "./components/wishlist/wishlist.component";
import { BookSummaryComponent } from "./components/book-summary/book-summary.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    AddtocartComponent,
    BookCardComponent,
    BookDetailsComponent,
    BookFilterComponent,
    CheckoutComponent,
    LoginComponent,
    MyOrdersComponent,
    UserRegistrationComponent,
    HomeComponent,
    NavBarComponent,
    ShoppingcartComponent,
    SimilarbooksComponent,
    PageNotFoundComponent,
    PriceFilterComponent,
    SearchComponent,
    AddtowishlistComponent,
    WishlistComponent,
    BookSummaryComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    CommonModule,
    NgMaterialModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [
    provideHttpClient(
      withInterceptors([HttpInterceptorService, ErrorInterceptorService])
    ),
  ],
})
export class AppModule {}
