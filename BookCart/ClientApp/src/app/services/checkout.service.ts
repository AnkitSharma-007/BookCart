import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Order } from "../models/order";

@Injectable({
  providedIn: "root",
})
export class CheckoutService {
  private readonly http = inject(HttpClient);
  private readonly baseURL = "/api/CheckOut/";

  placeOrder(userId: number, checkedOutItems: Order) {
    return this.http.post(this.baseURL + `${userId}`, checkedOutItems);
  }
}
