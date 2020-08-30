import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { DeleteBookComponent } from '../delete-book/delete-book.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.scss']
})
export class ManageBooksComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'title', 'author', 'category', 'price', 'operation'];

  dataSource = new MatTableDataSource<Book>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private unsubscribe$ = new Subject<void>();
  constructor(
    private bookService: BookService,
    public dialog: MatDialog,
    private snackBarService: SnackbarService) {
  }

  ngOnInit() {
    this.getAllBookData();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllBookData() {
    this.bookService.getAllBooks()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Book[]) => {
        this.dataSource.data = Object.values(data);
      }, error => {
        console.log('Error ocurred while fetching book details : ', error);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteConfirm(id: number): void {
    const dialogRef = this.dialog.open(DeleteBookComponent, {
      data: id
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result === 1) {
          this.getAllBookData();
          this.snackBarService.showSnackBar('Data deleted successfully');
        } else {
          this.snackBarService.showSnackBar('Error occurred!! Try again');
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
