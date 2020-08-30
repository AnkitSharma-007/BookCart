import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public books: Book[];
  public filteredProducts: Book[];
  category: string;
  priceRange = Number.MAX_SAFE_INTEGER;
  isLoading: boolean;

  constructor(private route: ActivatedRoute, private bookService: BookService) { }

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
      this.filterBookData();
    });
  }

  filterPrice(value: number) {
    this.priceRange = value;
    this.filterBookData();
  }

  filterBookData() {
    if (this.category) {
      this.books = this.filteredProducts.filter(b => b.price <= this.priceRange
        && b.category.toLowerCase() === this.category.toLowerCase());
    } else {
      this.books = this.filteredProducts.filter(b => b.price <= this.priceRange);
    }
    this.isLoading = false;
  }
}
