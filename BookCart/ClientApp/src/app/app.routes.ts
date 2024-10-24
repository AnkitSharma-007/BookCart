import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { AdminAuthGuard } from "./guards/admin-auth.guard";
import { AuthGuard } from "./guards/auth.guard";

export const APP_ROUTES: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "filter", component: HomeComponent },
  { path: "search", component: HomeComponent },
  {
    path: "login",
    loadComponent: () =>
      import("./components/login/login.component").then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: "register",
    loadComponent: () =>
      import("./components/user-registration/user-registration.component").then(
        (c) => c.UserRegistrationComponent
      ),
  },
  {
    path: "books/details/:id",
    loadComponent: () =>
      import("./components/book-details/book-details.component").then(
        (c) => c.BookDetailsComponent
      ),
  },
  {
    path: "shopping-cart",
    loadComponent: () =>
      import("./components/shoppingcart/shoppingcart.component").then(
        (c) => c.ShoppingcartComponent
      ),
  },
  {
    path: "checkout",
    loadComponent: () =>
      import("./components/checkout/checkout.component").then(
        (c) => c.CheckoutComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "myorders",
    loadComponent: () =>
      import("./components/my-orders/my-orders.component").then(
        (c) => c.MyOrdersComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "wishlist",
    loadComponent: () =>
      import("./components/wishlist/wishlist.component").then(
        (c) => c.WishlistComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "admin/books",
    loadChildren: () => import("./admin.routes").then((m) => m.ADMIN_ROUTES),
    canLoad: [AdminAuthGuard],
    canActivate: [AdminAuthGuard],
  },
  { path: "**", component: PageNotFoundComponent },
];
