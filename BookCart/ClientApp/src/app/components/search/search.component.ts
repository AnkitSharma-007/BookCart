import { AsyncPipe } from "@angular/common";
import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
} from "@angular/material/autocomplete";
import { MatOption } from "@angular/material/core";
import { Router } from "@angular/router";
import { Observable, ReplaySubject } from "rxjs";
import { map, startWith, takeUntil } from "rxjs/operators";
import { Book } from "src/app/models/book";
import { BookService } from "src/app/services/book.service";
import { SubscriptionService } from "src/app/services/subscription.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatOption,
    AsyncPipe,
  ],
})
export class SearchComponent implements OnInit, OnDestroy {
  private readonly bookService = inject(BookService);
  private readonly router = inject(Router);
  private readonly subscriptionService = inject(SubscriptionService);
  private destroyed$ = new ReplaySubject<void>(1);

  books: Book[];
  searchControl = new FormControl();
  filteredBooks: Observable<Book[]>;

  ngOnInit(): void {
    this.loadBookData();
    this.setSearchControlValue();
    this.filterBookData();
  }

  searchStore() {
    const searchItem = this.searchControl.value;
    if (searchItem !== "") {
      this.router.navigate(["/search"], {
        queryParams: {
          item: searchItem.toLowerCase(),
        },
      });
    }
  }

  cancelSearch() {
    this.router.navigate(["/"]);
  }

  private loadBookData() {
    this.bookService.books$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: Book[]) => {
        this.books = data;
      });
  }

  private setSearchControlValue() {
    this.subscriptionService.searchItemValue$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        if (data) {
          this.searchControl.setValue(data);
        } else {
          this.searchControl.setValue("");
        }
      });
  }

  private filterBookData() {
    this.filteredBooks = this.searchControl.valueChanges.pipe(
      startWith(""),
      map((value) => (value.length >= 1 ? this._filter(value) : []))
    );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.books?.filter(
      (option) =>
        option.title.toLowerCase().includes(filterValue) ||
        option.author.toLowerCase().includes(filterValue)
    );
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
