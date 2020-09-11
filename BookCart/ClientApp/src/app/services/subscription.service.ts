import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  userData = new BehaviorSubject<User>(new User());
  searchItemValue$ = new BehaviorSubject<string>('');
  wishlistItemcount$ = new Subject<number>();
  wishlistItem$ = new BehaviorSubject<Book[]>([]);
  cartItemcount$ = new Subject<number>();

  constructor() { }
}
