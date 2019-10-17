import { Component, OnInit, Input } from '@angular/core';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.scss']
})
export class BookFilterComponent implements OnInit {

  @Input('category')
  category;

  categoryList: [];

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getCategories().subscribe(
      (categoryData: []) => {
        this.categoryList = categoryData;
      }, error => {
        console.log('Error ocurred while fetching category List : ', error);
      });
  }

}
