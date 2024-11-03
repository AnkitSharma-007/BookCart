import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle,
} from "@angular/material/card";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { combineLatestWith, map } from "rxjs/operators";
import { BookService } from "src/app/services/book.service";
import { SubscriptionService } from "src/app/services/subscription.service";
import { AddtocartComponent } from "../addtocart/addtocart.component";
import { AddtowishlistComponent } from "../addtowishlist/addtowishlist.component";
import { BookSummaryComponent } from "../book-summary/book-summary.component";
import { SimilarbooksComponent } from "../similarbooks/similarbooks.component";

@Component({
  selector: "app-book-details",
  templateUrl: "./book-details.component.html",
  styleUrls: ["./book-details.component.scss"],
  standalone: true,
  imports: [
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly bookService = inject(BookService);
  private readonly subscriptionService = inject(SubscriptionService);

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
}
