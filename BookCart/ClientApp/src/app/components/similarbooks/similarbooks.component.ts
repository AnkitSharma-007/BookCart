import { Component } from "@angular/core";
import { BookService } from "src/app/services/book.service";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { BookCardComponent } from "../book-card/book-card.component";
import { NgIf, NgFor, AsyncPipe } from "@angular/common";
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from "@angular/material/card";

@Component({
    selector: "app-similarbooks",
    templateUrl: "./similarbooks.component.html",
    styleUrls: ["./similarbooks.component.scss"],
    standalone: true,
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        NgIf,
        NgFor,
        BookCardComponent,
        MatProgressSpinner,
        AsyncPipe,
    ],
})
export class SimilarbooksComponent {
  private readonly queryParams$ = this.activatedRoute.paramMap;

  similarBooks$ = this.queryParams$.pipe(
    switchMap((params) => {
      const bookId = Number(params.get("id"));
      return this.bookService.getsimilarBooks(bookId);
    })
  );

  constructor(
    private readonly bookService: BookService,
    private readonly activatedRoute: ActivatedRoute
  ) {}
}
