import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(public snackBar: MatSnackBar) { }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
