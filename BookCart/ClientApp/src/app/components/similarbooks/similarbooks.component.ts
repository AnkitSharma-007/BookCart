import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-similarbooks',
  templateUrl: './similarbooks.component.html',
  styleUrls: ['./similarbooks.component.scss']
})
export class SimilarbooksComponent implements OnInit, OnDestroy {

  @Input('bookId') bookId;

  public books: Book[];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      this.route.params.subscribe(
        params => {
          this.bookId = +params['id'];
          this.getSimilarBookData();
        }
      );
    });
  }

  getSimilarBookData() {
    this.bookService.getsimilarBooks(this.bookId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Book[]) => {
        this.books = Object.values(data);
      }, error => {
        console.log('Error ocurred while fetching book details : ', error);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
