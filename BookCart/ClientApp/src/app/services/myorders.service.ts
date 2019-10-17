import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyordersService {

  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = '/api/Order/';
  }

  myOrderDetails(userId: number) {
    return this.http.get(this.baseURL + userId)
      .pipe(map((response: Order[]) => {
        return response;
      }));
  }
}
