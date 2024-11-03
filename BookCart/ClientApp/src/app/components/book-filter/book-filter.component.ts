import { AsyncPipe, LowerCasePipe } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { MatDivider } from "@angular/material/divider";
import { MatListItem, MatNavList } from "@angular/material/list";
import { RouterLink } from "@angular/router";
import { EMPTY } from "rxjs";
import { catchError } from "rxjs/operators";
import { BookService } from "src/app/services/book.service";

@Component({
  selector: "app-book-filter",
  templateUrl: "./book-filter.component.html",
  styleUrls: ["./book-filter.component.scss"],
  standalone: true,
  imports: [
    MatNavList,
    MatListItem,
    RouterLink,
    MatDivider,
    AsyncPipe,
    LowerCasePipe,
  ],
})
export class BookFilterComponent {
  @Input()
  category: string;

  private bookService = inject(BookService);

  categories$ = this.bookService.categories$.pipe(
    catchError((error) => {
      console.log("Error ocurred while fetching category List : ", error);
      return EMPTY;
    })
  );
}
