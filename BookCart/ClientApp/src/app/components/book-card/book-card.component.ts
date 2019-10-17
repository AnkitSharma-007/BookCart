import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {

  @Input('book') book: Book;

  isActive = false;

  constructor(private router: Router) { }

  goToPage(id: number) {
    this.router.navigate(['/books/details/', id]);
  }
}
