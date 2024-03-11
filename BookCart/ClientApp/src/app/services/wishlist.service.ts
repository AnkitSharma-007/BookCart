import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Book } from "../models/book";
import { SubscriptionService } from "./subscription.service";

@Injectable({
  providedIn: "root",
})
export class WishlistService {
  private baseURL = "/api/Wishlist/";

  constructor(
    private http: HttpClient,
    private subscriptionService: SubscriptionService
  ) {}

  toggleWishlistItem(userId: number, bookId: number) {
    return this.http
      .post<Book[]>(this.baseURL + `ToggleWishlist/${userId}/${bookId}`, {})
      .pipe(
        map((response) => {
          this.setWishlist(response);
          return response;
        })
      );
  }

  getWishlistItems(userId: number) {
    return this.http.get<Book[]>(this.baseURL + userId).pipe(
      map((response) => {
        this.setWishlist(response);
        return response;
      })
    );
  }

  clearWishlist(userId: number) {
    return this.http.delete<number>(this.baseURL + `${userId}`, {}).pipe(
      map((response: number) => {
        this.subscriptionService.wishlistItem$.next([]);
        return response;
      })
    );
  }

  private setWishlist(response: Book[]) {
    this.subscriptionService.wishlistItemcount$.next(response.length);
    this.subscriptionService.wishlistItem$.next(response);
  }
}
