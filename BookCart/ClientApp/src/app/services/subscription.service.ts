import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Book } from "../models/book";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class SubscriptionService {
  userData$ = new BehaviorSubject<User>(new User());
  searchItemValue$ = new BehaviorSubject<string>("");
  wishlistItemcount$ = new BehaviorSubject<number>(0);
  wishlistItem$ = new BehaviorSubject<Book[]>([]);
  cartItemcount$ = new BehaviorSubject<number>(0);
  priceFilterValue$ = new BehaviorSubject<number>(Number.MAX_SAFE_INTEGER);
}
