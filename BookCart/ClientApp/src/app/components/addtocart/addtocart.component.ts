import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

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
    private userService: UserService,
    private snackBarService: SnackbarService) {
    this.userId = localStorage.getItem('userId');
  }

  addToCart() {
    this.cartService.addBookToCart(this.userId, this.bookId).subscribe(
      result => {
        this.userService.cartItemcount$.next(result);
        this.snackBarService.showSnackBar('One Item added to cart');
      }, error => {
        console.log('Error ocurred while addToCart data : ', error);
      });
  }
}
