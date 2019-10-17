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

  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit() {
    this.getAllBookData();
  }

  getAllBookData() {
    this.bookService.getAllBooks().pipe(switchMap(
      (data: Book[]) => {
        this.filteredProducts = data;
        return this.route.queryParams;
      }
    )).subscribe(params => {
      this.category = params['category'];
      this.books = (this.category) ?
        this.filteredProducts.filter(b => b.category.toLowerCase() === this.category.toLowerCase()) :
        this.filteredProducts;
    });
  }
}
