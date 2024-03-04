import { Component } from "@angular/core";
import { BookService } from "src/app/services/book.service";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs";

@Component({
  selector: "app-similarbooks",
  templateUrl: "./similarbooks.component.html",
  styleUrls: ["./similarbooks.component.scss"],
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
