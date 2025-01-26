import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from "@angular/material/card";
import { MatOption } from "@angular/material/core";
import {
  MatError,
  MatFormField,
  MatLabel,
  MatPrefix,
} from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatSelect } from "@angular/material/select";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { combineLatest, EMPTY } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { SnackbarService } from "src/app/services/snackbar.service";
import { addBook, updateBook } from "src/app/state/actions/book.actions";
import { loadCategories } from "src/app/state/actions/categories.actions";
import { selectCurrentBookDetails } from "src/app/state/selectors/book.selectors";
import { selectCategories } from "src/app/state/selectors/categories.selectors";

@Component({
    selector: "app-book-form",
    templateUrl: "./book-form.component.html",
    styleUrls: ["./book-form.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatError,
        MatSelect,
        MatOption,
        MatPrefix,
        MatCardActions,
        MatButton,
        MatIcon,
        AsyncPipe,
    ]
})
export class BookFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly snackBarService = inject(SnackbarService);
  private readonly formData = new FormData();
  private readonly store = inject(Store);

  coverImagePath;
  files;

  bookForm = this.fb.group({
    bookId: 0,
    title: ["", Validators.required],
    author: ["", Validators.required],
    category: ["", Validators.required],
    price: ["", [Validators.required, Validators.min(0)]],
  });

  bookFormData$ = combineLatest([
    this.store.select(selectCurrentBookDetails),
    this.store.select(selectCategories),
  ]).pipe(
    map(([book, categoryList]) => {
      if (book !== undefined) {
        this.setBookFormData(book);
      }
      return {
        formTitle: book?.bookId ? "Edit" : "Add",
        categoryList,
      };
    }),
    catchError((error) => {
      this.snackBarService.showSnackBar(
        "Error ocurred while fetching book data"
      );
      console.error("Error ocurred while fetching book data : ", error);
      return EMPTY;
    })
  );

  constructor() {
    this.store.dispatch(loadCategories());
  }

  protected get bookFormControl() {
    return this.bookForm.controls;
  }

  onFormSubmit() {
    if (!this.bookForm.valid) {
      return;
    }
    if (this.files && this.files.length > 0) {
      this.formData.append("file", this.files[0]);
    }
    this.formData.append("bookFormData", JSON.stringify(this.bookForm.value));

    if (this.bookForm.controls.bookId.value > 0) {
      this.store.dispatch(updateBook({ book: this.formData }));
    } else {
      this.store.dispatch(addBook({ book: this.formData }));
    }
  }

  uploadImage(event) {
    this.files = event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (myevent: ProgressEvent) => {
      this.coverImagePath = (myevent.target as FileReader).result;
    };
  }

  navigateToAdminPanel() {
    this.router.navigate(["/admin/books"]);
  }

  private setBookFormData(bookFormData) {
    this.bookForm.setValue({
      bookId: bookFormData.bookId,
      title: bookFormData.title,
      author: bookFormData.author,
      category: bookFormData.category,
      price: bookFormData.price,
    });
    this.coverImagePath = "/Upload/" + bookFormData.coverFileName;
  }
}
