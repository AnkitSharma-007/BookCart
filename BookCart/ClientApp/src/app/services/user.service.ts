import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL: string;

  cartItemcount$ = new Subject<any>();

  constructor(private http: HttpClient) {
    this.baseURL = '/api/user/';
  }

  registerUser(userdetails) {
    return this.http.post(this.baseURL, userdetails);
  }

  getCartItemCount(userId: number) {
    return this.http.get(this.baseURL + userId);
  }

  validateUserName(userName: string) {
    return this.http.get(this.baseURL + 'validateUserName/' + userName);
  }
}
