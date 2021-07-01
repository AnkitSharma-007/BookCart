import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.scss']
})
export class PriceFilterComponent implements OnInit {

  @Output()
  priceValue = new EventEmitter<number>(true);

  max: number;
  min: number;
  value: number;
  step = 100;
  thumbLabel = true;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.setPriceFilterProperties();
  }

  setPriceFilterProperties() {
    this.bookService.books$.pipe().subscribe(
      (data: Book[]) => {
        this.setMinValue(data);
        this.setMaxValue(data);
      }
    );
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  onChange(event) {
    this.priceValue.emit(event.value);
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
}
