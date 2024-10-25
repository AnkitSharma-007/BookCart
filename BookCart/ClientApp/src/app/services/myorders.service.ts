import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Order } from "../models/order";

@Injectable({
  providedIn: "root",
})
export class MyordersService {
  private readonly http = inject(HttpClient);
  private readonly baseURL = "/api/Order/";

  myOrderDetails(userId: number) {
    return this.http.get<Order[]>(this.baseURL + userId);
  }
}
