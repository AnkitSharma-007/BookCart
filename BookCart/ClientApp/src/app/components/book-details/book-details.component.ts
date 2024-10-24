import { Component } from "@angular/core";
import { BookService } from "src/app/services/book.service";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { combineLatestWith, map } from "rxjs/operators";
import { SubscriptionService } from "src/app/services/subscription.service";
import { MatButton } from "@angular/material/button";
import { SimilarbooksComponent } from "../similarbooks/similarbooks.component";
import { BookSummaryComponent } from "../book-summary/book-summary.component";
import { AddtowishlistComponent } from "../addtowishlist/addtowishlist.component";
import { AddtocartComponent } from "../addtocart/addtocart.component";
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardImage } from "@angular/material/card";
import { NgIf, AsyncPipe, CurrencyPipe } from "@angular/common";

@Component({
    selector: "app-book-details",
    templateUrl: "./book-details.component.html",
    styleUrls: ["./book-details.component.scss"],
    standalone: true,
    imports: [
        NgIf,
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        MatCardImage,
        AddtocartComponent,
        AddtowishlistComponent,
        BookSummaryComponent,
        SimilarbooksComponent,
        MatButton,
        RouterLink,
        AsyncPipe,
        CurrencyPipe,
    ],
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
