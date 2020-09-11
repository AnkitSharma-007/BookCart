import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.scss']
})
export class AddtocartComponent {

  @Input()
  bookId: number;

  userId;

  constructor(
    private cartService: CartService,
    private snackBarService: SnackbarService,
    private subscriptionService: SubscriptionService) {
    this.userId = localStorage.getItem('userId');
  }

  addToCart() {
    this.cartService.addBookToCart(this.userId, this.bookId).subscribe(
      result => {
        this.subscriptionService.cartItemcount$.next(result);
        this.snackBarService.showSnackBar('One Item added to cart');
      }, error => {
        console.log('Error ocurred while addToCart data : ', error);
      });
  }
}
