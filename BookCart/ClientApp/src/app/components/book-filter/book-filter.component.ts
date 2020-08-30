import { Component, OnInit, Input } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { catchError } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { Categories } from 'src/app/models/categories';

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.scss']
})
export class BookFilterComponent implements OnInit {

  @Input()
  category: string;

  categories$: Observable<Categories[]>;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.categories$ = this.bookService.categories$
      .pipe(
        catchError(error => {
          console.log('Error ocurred while fetching category List : ', error);
          return EMPTY;
        }));
  }
}
