import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ShoppingCart } from "../models/shoppingcart";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly baseURL = "/api/shoppingcart/";

  addBookToCart(userId: number, bookId: number) {
    return this.http.post<ShoppingCart[]>(
      this.baseURL + `addToCart/${userId}/${bookId}`,
      {}
    );
  }

  getCartItems(userId: number) {
    return this.http.get<ShoppingCart[]>(this.baseURL + userId);
  }

  // Delete a single item from the cart
  removeBookFromCart(userId: number, bookId: number) {
    return this.http.delete<ShoppingCart[]>(
      this.baseURL + `${userId}/${bookId}`,
      {}
    );
  }

  // Reduces the quantity by one for an item in shopping cart
  reduceCartQuantity(userId: number, bookId: number) {
    return this.http.put<ShoppingCart[]>(
      this.baseURL + `${userId}/${bookId}`,
      {}
    );
  }

  clearCart(userId: number) {
    return this.http.delete<number>(this.baseURL + `${userId}`, {});
  }
}
