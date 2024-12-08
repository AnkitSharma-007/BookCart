import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Book } from "../models/book";

@Injectable({
  providedIn: "root",
})
export class WishlistService {
  private readonly http = inject(HttpClient);
  private readonly baseURL = "/api/Wishlist/";

  toggleWishlistItem(userId: number, bookId: number) {
    return this.http.post<Book[]>(
      this.baseURL + `ToggleWishlist/${userId}/${bookId}`,
      {}
    );
  }

  getWishlistItems(userId: number) {
    return this.http.get<Book[]>(this.baseURL + userId);
  }

  clearWishlist(userId: number) {
    return this.http.delete<number>(this.baseURL + `${userId}`);
  }
}
