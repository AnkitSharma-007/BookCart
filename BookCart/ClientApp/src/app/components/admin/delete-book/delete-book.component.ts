import { Component, Inject, OnDestroy } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from "@angular/material/dialog";
import { BookService } from "src/app/services/book.service";
import { catchError, takeUntil } from "rxjs/operators";
import { EMPTY, Subject } from "rxjs";
import { MatButton } from "@angular/material/button";
import { CdkScrollable } from "@angular/cdk/scrolling";
import { NgIf, AsyncPipe, CurrencyPipe } from "@angular/common";

@Component({
    selector: "app-delete-book",
    templateUrl: "./delete-book.component.html",
    styleUrls: ["./delete-book.component.scss"],
    standalone: true,
    imports: [
        NgIf,
        MatDialogTitle,
        CdkScrollable,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        AsyncPipe,
        CurrencyPipe,
    ],
})
export class DeleteBookComponent implements OnDestroy {
  bookData$ = this.bookService.getBookById(this.bookid).pipe(
    catchError((error) => {
      console.log("Error ocurred while fetching book data : ", error);
      return EMPTY;
    })
  );
  private unsubscribe$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<DeleteBookComponent>,
    @Inject(MAT_DIALOG_DATA) public bookid: number,
    private bookService: BookService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.bookService
      .deleteBook(this.bookid)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        error: (error) => {
          console.log("Error ocurred while fetching book data : ", error);
        },
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
