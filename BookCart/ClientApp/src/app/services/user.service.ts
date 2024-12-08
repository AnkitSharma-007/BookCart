import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly baseURL = "/api/user/";

  registerUser(userdetails) {
    return this.http.post(this.baseURL, userdetails);
  }

  validateUserName(userName: string) {
    return this.http.get(this.baseURL + "validateUserName/" + userName);
  }
}
