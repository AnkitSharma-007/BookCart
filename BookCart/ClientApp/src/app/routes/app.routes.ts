import { Routes } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideState } from "@ngrx/store";
import { HomeComponent } from "../components/home/home.component";
import { AdminAuthGuard } from "../guards/admin-auth.guard";
import { AuthGuard } from "../guards/auth.guard";
import { RegisterEffects } from "../state/effects/register.effects";
import { SimilarBooksEffects } from "../state/effects/similar-books.effects";
import {
  REGISTER_FEATURE_KEY,
  registerReducer,
} from "../state/reducers/register.reducer";
import {
  SIMILAR_BOOKS_FEATURE_KEY,
  similarBooksReducer,
} from "../state/reducers/similar-books.reducers";
import { OrderEffects } from "../state/effects/order.effects";
import {
  ORDER_FEATURE_KEY,
  orderReducer,
} from "../state/reducers/order.reducers";
import { CheckoutEffects } from "../state/effects/checkout.effects";

export const APP_ROUTES: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full", title: "Home" },
  { path: "filter", component: HomeComponent, title: "Home | Filter Books" },
  { path: "search", component: HomeComponent, title: "Home | Search Books" },
  {
    path: "login",
    loadComponent: () =>
      import("../components/login/login.component").then(
        (c) => c.LoginComponent
      ),
    title: "Login",
  },
  {
    path: "register",
    providers: [
      provideEffects([RegisterEffects]),
      provideState(REGISTER_FEATURE_KEY, registerReducer),
    ],
    loadComponent: () =>
      import(
        "../components/user-registration/user-registration.component"
      ).then((c) => c.UserRegistrationComponent),
    title: "Register",
  },
  {
    path: "books/details/:id",
    providers: [
      provideEffects([SimilarBooksEffects]),
      provideState(SIMILAR_BOOKS_FEATURE_KEY, similarBooksReducer),
    ],
    loadComponent: () =>
      import("../components/book-details/book-details.component").then(
        (c) => c.BookDetailsComponent
      ),
    title: "Book Details",
  },
  {
    path: "shopping-cart",
    loadComponent: () =>
      import("../components/shoppingcart/shoppingcart.component").then(
        (c) => c.ShoppingcartComponent
      ),

    title: "Shopping Cart",
  },
  {
    path: "checkout",
    providers: [provideEffects([CheckoutEffects])],
    loadComponent: () =>
      import("../components/checkout/checkout.component").then(
        (c) => c.CheckoutComponent
      ),
    canActivate: [AuthGuard],
    title: "Checkout",
  },
  {
    path: "myorders",
    providers: [
      provideEffects([OrderEffects]),
      provideState(ORDER_FEATURE_KEY, orderReducer),
    ],
    loadComponent: () =>
      import("../components/my-orders/my-orders.component").then(
        (c) => c.MyOrdersComponent
      ),
    canActivate: [AuthGuard],
    title: "My Order Details",
  },
  {
    path: "wishlist",
    loadComponent: () =>
      import("../components/wishlist/wishlist.component").then(
        (c) => c.WishlistComponent
      ),
    canActivate: [AuthGuard],
    title: "Wishlist",
  },
  {
    path: "admin/books",
    loadChildren: () => import("./admin.routes").then((m) => m.ADMIN_ROUTES),
    canLoad: [AdminAuthGuard],
    canActivate: [AdminAuthGuard],
    title: "Admin | Books",
  },
  {
    path: "**",
    loadComponent: () =>
      import("../components/page-not-found/page-not-found.component").then(
        (c) => c.PageNotFoundComponent
      ),
    title: "Not Found",
  },
];
