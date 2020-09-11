import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from 'src/app/models/order';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ShoppingCart } from 'src/app/models/shoppingcart';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  userId;
  totalPrice: number;
  checkOutItems = new Order();
  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cartService: CartService,
    private checkOutService: CheckoutService,
    private snackBarService: SnackbarService,
    private subscriptionService: SubscriptionService) {
    this.userId = localStorage.getItem('userId');
  }

  checkOutForm = this.fb.group({
    name: ['', Validators.required],
    addressLine1: ['', Validators.required],
    addressLine2: ['', Validators.required],
    pincode: ['', Validators.compose([Validators.required, Validators.pattern('^[1-9][0-9]{5}$')])],
    state: ['', [Validators.required]]
  });

  get name() {
    return this.checkOutForm.get('name');
  }

  get addressLine1() {
    return this.checkOutForm.get('addressLine1');
  }

  get addressLine2() {
    return this.checkOutForm.get('addressLine2');
  }

  get pincode() {
    return this.checkOutForm.get('pincode');
  }
  get state() {
    return this.checkOutForm.get('state');
  }

  ngOnInit() {
    this.getCheckOutItems();
  }

  getCheckOutItems() {
    this.cartService.getCartItems(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: ShoppingCart[]) => {
          this.checkOutItems.orderDetails = result;
          this.getTotalPrice();
        }, error => {
          console.log('Error ocurred while fetching shopping cart item : ', error);
        });
  }

  getTotalPrice() {
    this.totalPrice = 0;
    this.checkOutItems.orderDetails.forEach(item => {
      this.totalPrice += (item.book.price * item.quantity);
    });
    this.checkOutItems.cartTotal = this.totalPrice;
  }

  placeOrder() {
    if (this.checkOutForm.valid) {
      this.checkOutService.placeOrder(this.userId, this.checkOutItems)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          result => {
            this.subscriptionService.cartItemcount$.next(result);
            this.router.navigate(['/myorders']);
            this.snackBarService.showSnackBar('Order placed successfully!!!');
          }, error => {
            console.log('Error ocurred while placing order : ', error);
          });
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
