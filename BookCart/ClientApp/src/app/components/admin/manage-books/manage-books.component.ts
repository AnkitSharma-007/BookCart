import { CurrencyPipe } from "@angular/common";
import { Component, OnDestroy, ViewChild, inject } from "@angular/core";
import { MatButton, MatIconButton } from "@angular/material/button";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from "@angular/material/table";
import { RouterLink } from "@angular/router";
import { ReplaySubject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Book } from "src/app/models/book";
import { BookService } from "src/app/services/book.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { DeleteBookComponent } from "../delete-book/delete-book.component";

@Component({
  selector: "app-manage-books",
  templateUrl: "./manage-books.component.html",
  styleUrls: ["./manage-books.component.scss"],
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatButton,
    RouterLink,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatSortHeader,
    MatCellDef,
    MatCell,
    MatIconButton,
    MatIcon,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatNoDataRow,
    MatPaginator,
    CurrencyPipe,
  ],
})
export class ManageBooksComponent implements OnDestroy {
  private readonly bookService = inject(BookService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBarService = inject(SnackbarService);

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
  private destroyed$ = new ReplaySubject<void>(1);

  constructor() {
    this.getAllBookData();
  }

  getAllBookData() {
    this.bookService
      .getAllBooks()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data) => {
          this.dataSource.data = data;
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
      .pipe(takeUntil(this.destroyed$))
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
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
