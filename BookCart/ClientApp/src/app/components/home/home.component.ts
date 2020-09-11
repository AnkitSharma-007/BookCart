import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from 'src/app/models/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { switchMap } from 'rxjs/operators';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public books: Book[];
  public filteredProducts: Book[];
  category: string;
  priceRange = Number.MAX_SAFE_INTEGER;
  isLoading: boolean;
  searchItem: string;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private subscriptionService: SubscriptionService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.getAllBookData();
  }

  getAllBookData() {
    this.bookService.books$.pipe(switchMap(
      (data: Book[]) => {
        this.filteredProducts = data;
        return this.route.queryParams;
      }
    )).subscribe(params => {
      this.category = params.category;
      this.searchItem = params.item;
      this.subscriptionService.searchItemValue$.next(this.searchItem);
      this.filterBookData();
    });
  }

  filterPrice(value: number) {
    this.priceRange = value;
    this.filterBookData();
  }

  filterBookData() {
    const filteredData = this.filteredProducts.filter(b => b.price <= this.priceRange).slice();

    if (this.category) {
      this.books = filteredData.filter(b => b.category.toLowerCase() === this.category.toLowerCase());
    } else if (this.searchItem) {
      this.books = filteredData.filter(b => b.title.toLowerCase().indexOf(this.searchItem) !== -1
        || b.author.toLowerCase().indexOf(this.searchItem) !== -1);
    } else {
      this.books = filteredData;
    }
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.subscriptionService.searchItemValue$.next('');
  }
}
