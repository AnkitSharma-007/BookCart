import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Book } from '../models/book';
import { SubscriptionService } from './subscription.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  baseURL: string;

  constructor(
    private http: HttpClient,
    private subscriptionService: SubscriptionService) {
    this.baseURL = '/api/Wishlist/';
  }

  toggleWishlistItem(userId: number, bookId: number) {
    return this.http.post<Book[]>(this.baseURL + `ToggleWishlist/${userId}/${bookId}`, {})
      .pipe(map((response: Book[]) => {
        this.setWishlist(response);
        return response;
      }));
  }

  getWishlistItems(userId: number) {
    return this.http.get(this.baseURL + userId)
      .pipe(map((response: Book[]) => {
        this.setWishlist(response);
        return response;
      }));
  }

  setWishlist(response: Book[]) {
    this.subscriptionService.wishlistItemcount$.next(response.length);
    this.subscriptionService.wishlistItem$.next(response);
  }

  clearWishlist(userId: number) {
    return this.http.delete<number>(this.baseURL + `${userId}`, {}).pipe(
      map((response: number) => {
        this.subscriptionService.wishlistItem$.next([]);
        return response;
      })
    );
  }
}
