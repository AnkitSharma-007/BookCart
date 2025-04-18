import { AsyncPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from "@angular/core";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { combineLatestWith, map } from "rxjs/operators";
import { Book } from "src/app/models/book";
import { SubscriptionService } from "src/app/services/subscription.service";
import {
  loadBooks,
  resetSearchItemValue,
  setSearchItemValue,
} from "src/app/state/actions/book.actions";
import { selectBooks } from "src/app/state/selectors/book.selectors";
import { BookCardComponent } from "../book-card/book-card.component";
import { BookFilterComponent } from "../book-filter/book-filter.component";
import { PriceFilterComponent } from "../price-filter/price-filter.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  private readonly subscriptionService = inject(SubscriptionService);
  private readonly store = inject(Store);

  // Added the following two variables for better readability
  private readonly queryParams$ = this.activatedRoute.queryParams;
  private readonly book$ = this.store.select(selectBooks);

  vm$ = this.queryParams$.pipe(
    combineLatestWith(this.book$, this.subscriptionService.priceFilterValue$),
    map(([params, books, priceFilter]) => {
      let homeVm = new Vm();

      homeVm.bookList = books;
      homeVm.selectedCategory = params.category;
      homeVm.searchItem = params.item;

      this.store.dispatch(
        setSearchItemValue({ searchItem: homeVm.searchItem })
      );

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

  constructor() {
    this.store.dispatch(loadBooks());
  }

  ngOnDestroy() {
    this.store.dispatch(resetSearchItemValue());
  }
}

class Vm {
  bookList: Book[];
  selectedCategory: string;
  searchItem: string;

  constructor() {
    this.bookList = [];
    this.selectedCategory = "";
    this.searchItem = "";
  }
}
