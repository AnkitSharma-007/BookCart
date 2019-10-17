import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-similarbooks',
  templateUrl: './similarbooks.component.html',
  styleUrls: ['./similarbooks.component.scss']
})
export class SimilarbooksComponent implements OnInit {

  @Input('bookId') bookId;

  public books: Book[];

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute) { }

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
    this.bookService.getsimilarBooks(this.bookId).subscribe((data: Book[]) => {
      this.books = Object.values(data);
    }, error => {
      console.log('Error ocurred while fetching book details : ', error);
    });
  }
}
