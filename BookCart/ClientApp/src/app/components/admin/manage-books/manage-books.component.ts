import { Component, ViewChild, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Book } from "src/app/models/book";
import { BookService } from "src/app/services/book.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { DeleteBookComponent } from "../delete-book/delete-book.component";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-manage-books",
  templateUrl: "./manage-books.component.html",
  styleUrls: ["./manage-books.component.scss"],
})
export class ManageBooksComponent implements OnDestroy {
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  displayedColumns: string[] = [
    "id",
    "title",
    "author",
    "category",
    "price",
    "operation",
  ];

  dataSource = new MatTableDataSource<Book>();
  private unsubscribe$ = new Subject<void>();

  constructor(
    private bookService: BookService,
    private dialog: MatDialog,
    private snackBarService: SnackbarService
  ) {
    this.getAllBookData();
  }

  getAllBookData() {
    this.bookService
      .getAllBooks()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data) => {
          this.dataSource.data = Object.values(data);
        },
        error: (error) => {
          console.log("Error ocurred while fetching book details : ", error);
        },
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteConfirm(id: number): void {
    const dialogRef = this.dialog.open(DeleteBookComponent, {
      data: id,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result === 1) {
          this.getAllBookData();
          this.snackBarService.showSnackBar("Data deleted successfully");
        } else {
          this.snackBarService.showSnackBar("Error occurred!! Try again");
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
