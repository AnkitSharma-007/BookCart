import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { Component, inject, OnDestroy } from "@angular/core";
import { MatButton } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { EMPTY, ReplaySubject } from "rxjs";
import { catchError, takeUntil } from "rxjs/operators";
import { BookService } from "src/app/services/book.service";

@Component({
  selector: "app-delete-book",
  templateUrl: "./delete-book.component.html",
  styleUrls: ["./delete-book.component.scss"],
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    AsyncPipe,
    CurrencyPipe,
  ],
})
export class DeleteBookComponent implements OnDestroy {
  private readonly bookService = inject(BookService);
  private readonly dialogRef = inject(MatDialogRef<DeleteBookComponent>);
  private readonly bookid = inject<number>(MAT_DIALOG_DATA);

  bookData$ = this.bookService.getBookById(this.bookid).pipe(
    catchError((error) => {
      console.log("Error ocurred while fetching book data : ", error);
      return EMPTY;
    })
  );
  private destroyed$ = new ReplaySubject<void>(1);

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.bookService
      .deleteBook(this.bookid)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        error: (error) => {
          console.log("Error ocurred while fetching book data : ", error);
        },
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
