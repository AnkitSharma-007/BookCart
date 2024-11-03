import { AsyncPipe } from "@angular/common";
import { Component, inject, OnDestroy } from "@angular/core";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { ActivatedRoute } from "@angular/router";
import { combineLatestWith, map } from "rxjs/operators";
import { Book } from "src/app/models/book";
import { BookService } from "src/app/services/book.service";
import { SubscriptionService } from "src/app/services/subscription.service";
import { BookCardComponent } from "../book-card/book-card.component";
import { BookFilterComponent } from "../book-filter/book-filter.component";
import { PriceFilterComponent } from "../price-filter/price-filter.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  standalone: true,
  imports: [
    BookFilterComponent,
    PriceFilterComponent,
    BookCardComponent,
    MatProgressSpinner,
    AsyncPipe,
  ],
})
export class HomeComponent implements OnDestroy {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly bookService = inject(BookService);
  private readonly subscriptionService = inject(SubscriptionService);

  // Added the following two variables for better readability
  private readonly queryParams$ = this.activatedRoute.queryParams;
  private readonly book$ = this.bookService.books$;

  vm$ = this.queryParams$.pipe(
    combineLatestWith(this.book$, this.subscriptionService.priceFilterValue$),
    map(([params, books, priceFilter]) => {
      let homeVm = new Vm();

      homeVm.bookList = books;
      homeVm.selectedCategory = params.category;
      homeVm.searchItem = params.item;
      homeVm.minPriceFilterValue = Math.min(...books.map((b) => b.price));
      homeVm.maxPriceFilterValue = Math.max(...books.map((b) => b.price));

      this.subscriptionService.searchItemValue$.next(homeVm.searchItem);

      if (homeVm.selectedCategory) {
        const filteredBookByCategory = books.filter(
          (book) =>
            book.category.toLocaleLowerCase() ===
            homeVm.selectedCategory.toLocaleLowerCase()
        );
        homeVm.bookList = filteredBookByCategory;
      } else {
        homeVm.bookList = books;
      }

      if (homeVm.searchItem) {
        const filteredBookBySearch = books.filter(
          (book) =>
            book.title
              .toLocaleLowerCase()
              .indexOf(homeVm.searchItem.toLocaleLowerCase()) !== -1 ||
            book.author
              .toLocaleLowerCase()
              .indexOf(homeVm.searchItem.toLocaleLowerCase()) !== -1
        );
        homeVm.bookList = filteredBookBySearch;
      }

      homeVm.bookList = homeVm.bookList.filter(
        (book) => book.price <= priceFilter
      );

      return homeVm;
    })
  );

  ngOnDestroy() {
    this.subscriptionService.searchItemValue$.next("");
  }
}

class Vm {
  bookList: Book[];
  selectedCategory: string;
  searchItem: string;
  minPriceFilterValue: number;
  maxPriceFilterValue: number;

  constructor() {
    this.bookList = [];
    this.selectedCategory = "";
    this.searchItem = "";
    this.minPriceFilterValue = 0;
    this.maxPriceFilterValue = Number.MAX_SAFE_INTEGER;
  }
}
