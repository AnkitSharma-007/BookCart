import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { ShoppingCart } from "../models/shoppingcart";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly baseURL = "/api/shoppingcart/";
  cartItemCount = 0;

  addBookToCart(userId: number, bookId: number) {
    return this.http.post<number>(
      this.baseURL + `addToCart/${userId}/${bookId}`,
      {}
    );
  }

  getCartItems(userId: number) {
    return this.http.get<ShoppingCart[]>(this.baseURL + userId).pipe(
      map((response: ShoppingCart[]) => {
        this.cartItemCount = response.length;
        return response;
      })
    );
  }

  removeCartItems(userId: number, bookId: number) {
    return this.http.delete<number>(this.baseURL + `${userId}/${bookId}`, {});
  }

  deleteOneCartItem(userId: number, bookId: number) {
    return this.http.put<number>(this.baseURL + `${userId}/${bookId}`, {});
  }

  clearCart(userId: number) {
    return this.http.delete<number>(this.baseURL + `${userId}`, {});
  }

  setCart(oldUserId: number, newUserId: number) {
    return this.http
      .get(this.baseURL + `setShoppingCart/${oldUserId}/${newUserId}`, {})
      .pipe(
        map((response: any) => {
          this.cartItemCount = response;
          return response;
        })
      );
  }
}
