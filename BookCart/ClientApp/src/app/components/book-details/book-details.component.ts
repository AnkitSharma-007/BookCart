import { Component } from "@angular/core";
import { BookService } from "src/app/services/book.service";
import { ActivatedRoute } from "@angular/router";
import { combineLatestWith, map } from "rxjs/operators";
import { SubscriptionService } from "src/app/services/subscription.service";

@Component({
  selector: "app-book-details",
  templateUrl: "./book-details.component.html",
  styleUrls: ["./book-details.component.scss"],
})
export class BookDetailsComponent {
  userData$ = this.subscriptionService.userData$.asObservable();

  private readonly queryParams$ = this.activatedRoute.paramMap;
  private readonly book$ = this.bookService.books$;

  bookDetails$ = this.queryParams$.pipe(
    combineLatestWith(this.book$),
    map(([params, bookList]) => {
      const selectedBookId = Number(params.get("id"));
      return bookList.find((book) => book.bookId === selectedBookId);
    })
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private subscriptionService: SubscriptionService
  ) {}
}
