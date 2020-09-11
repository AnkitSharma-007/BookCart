import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  bookId;
  BookDetails$: Observable<Book>;
  userData$: Observable<User>;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private subscriptionService: SubscriptionService) {
    this.bookId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.bookId = +params.id;
        this.getBookDetails();
      }
    );
    this.userData$ = this.subscriptionService.userData;
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
