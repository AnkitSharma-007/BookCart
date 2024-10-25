import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly baseURL = "/api/user/";

  registerUser(userdetails) {
    return this.http.post(this.baseURL, userdetails);
  }

  getCartItemCount(userId: number) {
    return this.http.get<number>(this.baseURL + userId);
  }

  validateUserName(userName: string) {
    return this.http.get(this.baseURL + "validateUserName/" + userName);
  }
}
