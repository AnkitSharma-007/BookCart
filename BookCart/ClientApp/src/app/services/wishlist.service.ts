import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { Book } from "../models/book";
import { SubscriptionService } from "./subscription.service";

@Injectable({
  providedIn: "root",
})
export class WishlistService {
  private readonly http = inject(HttpClient);
  private readonly subscriptionService = inject(SubscriptionService);
  private readonly baseURL = "/api/Wishlist/";

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
      tap((response) => {
        this.setWishlist(response);
      })
    );
  }

  clearWishlist(userId: number) {
    return this.http.delete<number>(this.baseURL + `${userId}`, {}).pipe(
      tap(() => {
        this.subscriptionService.wishlistItem$.next([]);
      })
    );
  }

  private setWishlist(response: Book[]) {
    this.subscriptionService.wishlistItemcount$.next(response.length);
    this.subscriptionService.wishlistItem$.next(response);
  }
}
