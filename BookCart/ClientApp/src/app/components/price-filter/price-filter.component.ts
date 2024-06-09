import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from "@angular/core";
import { BookService } from "src/app/services/book.service";
import { Book } from "src/app/models/book";
import { ReplaySubject, takeUntil } from "rxjs";

@Component({
  selector: "app-price-filter",
  templateUrl: "./price-filter.component.html",
  styleUrls: ["./price-filter.component.scss"],
})
export class PriceFilterComponent implements OnInit, OnDestroy {
  @Output()
  priceValue = new EventEmitter<number>(true);

  max: number;
  min: number;
  value: number;
  step = 100;
  thumbLabel = true;
  private destroyed$ = new ReplaySubject<void>(1);

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.setPriceFilterProperties();
  }

  setPriceFilterProperties() {
    this.bookService.books$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: Book[]) => {
        this.setMinValue(data);
        this.setMaxValue(data);
      });
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + "k";
    }
    return value as unknown as string;
  }

  onChange() {
    this.priceValue.emit(this.value);
  }

  setMinValue(book: Book[]) {
    this.min = book.reduce((prev, curr) => {
      return prev.price < curr.price ? prev : curr;
    }).price;
  }

  setMaxValue(book: Book[]) {
    this.value = this.max = book.reduce((prev, curr) => {
      return prev.price > curr.price ? prev : curr;
    }).price;
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
