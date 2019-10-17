import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  public book: Book;
  bookId;

  constructor(private _bookService: BookService, private _route: ActivatedRoute) {
    this.bookId = this._route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this._route.queryParams.subscribe(param => {
      this._route.params.subscribe(
        params => {
          this.bookId = +params['id'];
          this.getBookDetails();
        }
      );
    });
  }

  getBookDetails() {
    this._bookService.getBookById(this.bookId).subscribe(
      (result: Book) => {
        this.book = result;
      }, error => {
        console.log('Error ocurred while fetching book data : ', error);
      });
  }

}
