import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { UserLogin } from "../models/userLogin";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private readonly http = inject(HttpClient);

  login(user: UserLogin) {
    return this.http.post<any>("/api/login", user);
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
}
