import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyordersService {

  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = '/api/Order/';
  }

  myOrderDetails(userId: number) {
    return this.http.get(this.baseURL + userId);
  }
}
