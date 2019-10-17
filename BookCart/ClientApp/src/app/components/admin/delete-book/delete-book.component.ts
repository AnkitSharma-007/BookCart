import { Component, OnInit, Inject } from '@angular/core';
import { Book } from 'src/app/models/book';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent implements OnInit {

  public bookData = new Book();

  constructor(
    public dialogRef: MatDialogRef<DeleteBookComponent>,
    @Inject(MAT_DIALOG_DATA) public bookid: number,
    private bookService: BookService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.bookService.deleteBook(this.bookid).subscribe(
      () => {
      }, error => {
        console.log('Error ocurred while fetching book data : ', error);
      });
  }

  ngOnInit() {
    this.bookService.getBookById(this.bookid).subscribe(
      (result: Book) => {
        this.bookData = result;
      }, error => {
        console.log('Error ocurred while fetching book data : ', error);
      });
  }
}
