import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "../models/user";
import { UserLogin } from "../models/userLogin";
import { SubscriptionService } from "./subscription.service";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private readonly http = inject(HttpClient);
  private readonly subscriptionService = inject(SubscriptionService);

  login(user: UserLogin) {
    return this.http.post<any>("/api/login", user);
  }

  logout() {
    localStorage.clear();
    this.resetSubscription();
    this.setTempUserId();
  }

  setTempUserId() {
    if (!localStorage.getItem("userId")) {
      const tempUserID = this.generateTempUserId();
      localStorage.setItem("userId", tempUserID.toString());
    }
  }

  private generateTempUserId() {
    return Math.floor(Math.random() * (99999 - 11111 + 1) + 12345);
  }

  private resetSubscription() {
    this.subscriptionService.userData$.next(new User());
    this.subscriptionService.wishlistItem$.next([]);
    this.subscriptionService.wishlistItemcount$.next(0);
    this.subscriptionService.cartItemcount$.next(0);
  }
}
