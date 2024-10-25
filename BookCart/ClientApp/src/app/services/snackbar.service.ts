import { inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class SnackbarService {
  private readonly snackBar = inject(MatSnackBar);

  showSnackBar(message: string) {
    this.snackBar.open(message, "", {
      duration: 2000,
      verticalPosition: "bottom",
      horizontalPosition: "center",
    });
  }
}
