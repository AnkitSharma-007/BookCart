import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, Observable, combineLatest } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnDestroy {

  public book: Book;
  bookId;
  private unsubscribe$ = new Subject<void>();

  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) {
    this.bookId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      this.route.params.subscribe(
        params => {
          this.bookId = +params['id'];
          this.getBookDetails();
        }
      );
    });
  }

  getBookDetails() {
    this.bookService.getBookById(this.bookId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: Book) => {
          this.book = result;
        }, error => {
          console.log('Error ocurred while fetching book data : ', error);
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
