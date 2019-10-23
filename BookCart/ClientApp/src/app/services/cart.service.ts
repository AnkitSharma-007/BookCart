import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ShoppingCart } from '../models/shoppingcart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItemCount = 0;
  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = '/api/shoppingcart/';
  }

  addBookToCart(userId: number, bookId: number) {
    return this.http.post(this.baseURL + `addToCart/${userId}/${bookId}`, {})
      .pipe(map(response => {
        return response;
      }));
  }

  getCartItems(userId: number) {
    return this.http.get(this.baseURL + userId)
      .pipe(map((response: ShoppingCart[]) => {
        this.cartItemCount = response.length;
        return response;
      }));
  }

  removeCartItems(userId: number, bookId: number) {
    return this.http.delete(this.baseURL + `${userId}/${bookId}`, {})
      .pipe(map(response => {
        return response;
      }));
  }

  deleteOneCartItem(userId: number, bookId: number) {
    return this.http.put(this.baseURL + `${userId}/${bookId}`, {})
      .pipe(map(response => {
        return response;
      }));
  }

  clearCart(userId: number) {
    return this.http.delete(this.baseURL + `${userId}`, {})
      .pipe(map(response => {
        return response;
      }));
  }

  setCart(oldUserId: number, newUserId: number) {
    return this.http.get(this.baseURL + `setShoppingCart/${oldUserId}/${newUserId}`, {})
      .pipe(map((response: any) => {
        this.cartItemCount = response;
        return response;
      }));
  }
}
