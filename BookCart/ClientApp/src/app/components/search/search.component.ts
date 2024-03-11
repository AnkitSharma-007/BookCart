import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { BookService } from "src/app/services/book.service";
import { Book } from "src/app/models/book";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { SubscriptionService } from "src/app/services/subscription.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  public books: Book[];
  searchControl = new FormControl();
  filteredBooks: Observable<Book[]>;

  constructor(
    private bookService: BookService,
    private router: Router,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.loadBookData();
    this.setSearchControlValue();
    this.filterBookData();
  }

  searchStore() {
    const searchItem = this.searchControl.value;
    if (searchItem !== "") {
      this.router.navigate(["/search"], {
        queryParams: {
          item: searchItem.toLowerCase(),
        },
      });
    }
  }

  cancelSearch() {
    this.router.navigate(["/"]);
  }

  private loadBookData() {
    this.bookService.books$.subscribe((data: Book[]) => {
      this.books = data;
    });
  }

  private setSearchControlValue() {
    this.subscriptionService.searchItemValue$.subscribe((data) => {
      if (data) {
        this.searchControl.setValue(data);
      } else {
        this.searchControl.setValue("");
      }
    });
  }

  private filterBookData() {
    this.filteredBooks = this.searchControl.valueChanges.pipe(
      startWith(""),
      map((value) => (value.length >= 1 ? this._filter(value) : []))
    );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.books?.filter(
      (option) =>
        option.title.toLowerCase().includes(filterValue) ||
        option.author.toLowerCase().includes(filterValue)
    );
  }
}
