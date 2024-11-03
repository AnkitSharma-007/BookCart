import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from "@angular/material/card";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs";
import { BookService } from "src/app/services/book.service";
import { BookCardComponent } from "../book-card/book-card.component";

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
    BookCardComponent,
    MatProgressSpinner,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimilarbooksComponent {
  private readonly bookService = inject(BookService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly queryParams$ = this.activatedRoute.paramMap;

  similarBooks$ = this.queryParams$.pipe(
    switchMap((params) => {
      const bookId = Number(params.get("id"));
      return this.bookService.getsimilarBooks(bookId);
    })
  );
}
