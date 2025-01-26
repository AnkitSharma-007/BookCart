import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
} from "@angular/material/autocomplete";
import { MatOption } from "@angular/material/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import {
  combineLatestWith,
  distinctUntilChanged,
  map,
  startWith,
} from "rxjs/operators";
import {
  selectBooks,
  selectSearchItemValue,
} from "src/app/state/selectors/book.selectors";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        MatAutocompleteTrigger,
        MatAutocomplete,
        MatOption,
        AsyncPipe,
    ]
})
export class SearchComponent {
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  searchControl = new FormControl("", { nonNullable: true });
  private readonly books$ = this.store.select(selectBooks);

  searchItemValue$ = this.store.select(selectSearchItemValue).pipe(
    map((data) => {
      this.searchControl.setValue(data);
    })
  );

  filterSuggetions$ = this.searchControl.valueChanges.pipe(
    startWith(""),
    combineLatestWith(this.books$, this.searchItemValue$),
    distinctUntilChanged(),
    map(([searchValue, books]) => {
      const value = searchValue.toLowerCase();
      if (value.length > 0) {
        return books.filter(
          (book) =>
            book.title.toLocaleLowerCase().includes(value) ||
            book.author.toLocaleLowerCase().includes(value)
        );
      } else {
        return [];
      }
    })
  );

  searchBooks() {
    const searchItem = this.searchControl.value;
    if (searchItem !== "") {
      this.router.navigate(["/search"], {
        queryParams: {
          item: searchItem.toLowerCase(),
        },
      });
    } else {
      this.cancelSearch();
    }
  }

  cancelSearch() {
    this.router.navigate(["/"]);
  }
}
