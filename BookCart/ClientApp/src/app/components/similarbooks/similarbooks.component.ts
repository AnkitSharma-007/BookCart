import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-similarbooks',
  templateUrl: './similarbooks.component.html',
  styleUrls: ['./similarbooks.component.scss']
})
export class SimilarbooksComponent implements OnInit {

  @Input()
  bookId: number;

  SimilarBook$: Observable<Book[]>;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.bookId = +params.id;
        this.getSimilarBookData();
      }
    );
  }

  getSimilarBookData() {
    this.SimilarBook$ = this.bookService.getsimilarBooks(this.bookId);
  }
}
