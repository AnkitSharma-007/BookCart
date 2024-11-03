import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";
import { SubscriptionService } from "./subscription.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly subscriptionService = inject(SubscriptionService);
  private readonly baseURL = "/api/user/";

  registerUser(userdetails) {
    return this.http.post(this.baseURL, userdetails);
  }

  getCartItemCount(userId: number) {
    return this.http
      .get<number>(this.baseURL + userId)
      .pipe(tap((response) => this.setCart(response)));
  }

  validateUserName(userName: string) {
    return this.http.get(this.baseURL + "validateUserName/" + userName);
  }

  private setCart(response: number) {
    this.subscriptionService.cartItemcount$.next(response);
  }
}
