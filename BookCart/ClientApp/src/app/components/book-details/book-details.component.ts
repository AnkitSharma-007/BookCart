import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  bookId;
  BookDetails$: Observable<Book>;

  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) {
    this.bookId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.bookId = +params.id;
        this.getBookDetails();
      }
    );
  }

  getBookDetails() {
    this.BookDetails$ = this.bookService.getBookById(this.bookId)
      .pipe(
        catchError(error => {
          console.log('Error ocurred while fetching book data : ', error);
          return EMPTY;
        }));
  }
}
