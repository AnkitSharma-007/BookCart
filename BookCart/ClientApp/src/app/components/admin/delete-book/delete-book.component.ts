import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { deleteBook } from "src/app/state/actions/book.actions";
import { selectBookById } from "src/app/state/selectors/book.selectors";

@Component({
    selector: "app-delete-book",
    templateUrl: "./delete-book.component.html",
    styleUrls: ["./delete-book.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        AsyncPipe,
        CurrencyPipe,
    ]
})
export class DeleteBookComponent {
  private readonly dialogRef = inject(MatDialogRef<DeleteBookComponent>);
  private readonly bookid = inject<number>(MAT_DIALOG_DATA);
  private readonly store = inject(Store);

  bookData$ = this.store.select(selectBookById(this.bookid));

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.store.dispatch(deleteBook({ bookId: this.bookid }));
  }
}
