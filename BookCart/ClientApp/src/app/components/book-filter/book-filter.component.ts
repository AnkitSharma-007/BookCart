import { Component, Input } from "@angular/core";
import { BookService } from "src/app/services/book.service";
import { catchError } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { MatDivider } from "@angular/material/divider";
import { AsyncPipe, LowerCasePipe } from "@angular/common";
import { RouterLink } from "@angular/router";
import { MatNavList, MatListItem } from "@angular/material/list";

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
    LowerCasePipe
],
})
export class BookFilterComponent {
  @Input()
  category: string;

  categories$ = this.bookService.categories$.pipe(
    catchError((error) => {
      console.log("Error ocurred while fetching category List : ", error);
      return EMPTY;
    })
  );

  constructor(private bookService: BookService) {}
}
