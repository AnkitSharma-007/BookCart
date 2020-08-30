import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { map } from 'rxjs/operators';

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
    this.bookService.books$.pipe(map
      (book => book.sort((a, b) => (a.price > b.price ? 1 : ((b.price > a.price) ? -1 : 0)))))
      .subscribe(data => {
        this.min = data[0].price;
        this.value = this.max = data[data.length - 1].price;
      });
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

}
