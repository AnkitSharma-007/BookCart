import { Component, OnInit, OnDestroy } from "@angular/core";
import { Book } from "src/app/models/book";
import { ActivatedRoute } from "@angular/router";
import { BookService } from "src/app/services/book.service";
import { switchMap, takeUntil } from "rxjs/operators";
import { SubscriptionService } from "src/app/services/subscription.service";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { BookCardComponent } from "../book-card/book-card.component";
import { PriceFilterComponent } from "../price-filter/price-filter.component";
import { BookFilterComponent } from "../book-filter/book-filter.component";
import { ReplaySubject } from "rxjs";

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
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  public books: Book[];
  public filteredProducts: Book[];
  category: string;
  priceRange = Number.MAX_SAFE_INTEGER;
  isLoading: boolean;
  searchItem: string;
  private destroyed$ = new ReplaySubject<void>(1);

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.getAllBookData();
  }

  getAllBookData() {
    this.bookService.books$
      .pipe(
        switchMap((data: Book[]) => {
          this.filteredProducts = data;
          return this.route.queryParams;
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe((params) => {
        this.category = params.category;
        this.searchItem = params.item;
        this.subscriptionService.searchItemValue$.next(this.searchItem);
        this.filterBookData();
      });
  }

  filterPrice(value: number) {
    this.priceRange = value;
    this.filterBookData();
  }

  filterBookData() {
    const filteredData = this.filteredProducts
      .filter((b) => b.price <= this.priceRange)
      .slice();

    if (this.category) {
      this.books = filteredData.filter(
        (b) => b.category.toLowerCase() === this.category.toLowerCase()
      );
    } else if (this.searchItem) {
      this.books = filteredData.filter(
        (b) =>
          b.title.toLowerCase().indexOf(this.searchItem) !== -1 ||
          b.author.toLowerCase().indexOf(this.searchItem) !== -1
      );
    } else {
      this.books = filteredData;
    }
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.subscriptionService.searchItemValue$.next("");
  }
}
