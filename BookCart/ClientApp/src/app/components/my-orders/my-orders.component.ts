import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { CurrencyPipe, DatePipe } from "@angular/common";
import { Component, inject, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatButton } from "@angular/material/button";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatPaginator } from "@angular/material/paginator";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
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
import { Order } from "src/app/models/order";
import { MyordersService } from "src/app/services/myorders.service";

@Component({
  selector: "app-my-orders",
  templateUrl: "./my-orders.component.html",
  styleUrls: ["./my-orders.component.scss"],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed, void",
        style({ height: "0px", minHeight: "0", display: "none" })
      ),
      state("expanded", style({ height: "*" })),
      transition("* <=> *", animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")),
    ]),
  ],
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    RouterLink,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatNoDataRow,
    MatPaginator,
    MatProgressSpinner,
    MatButton,
    CurrencyPipe,
    DatePipe,
  ],
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  private readonly orderService = inject(MyordersService);

  displayedColumns: string[] = ["orderId", "orderedOn", "orderTotal"];
  dataSource = new MatTableDataSource<Order>();
  expandedElement: null;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.dataSource.paginator = mp;
  }

  userId = localStorage.getItem("userId");
  isLoading: boolean;
  private destroyed$ = new ReplaySubject<void>(1);

  ngOnInit() {
    this.getMyOrderDetails();
  }

  getMyOrderDetails() {
    this.isLoading = true;
    this.orderService
      .myOrderDetails(Number(this.userId))
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (result) => {
          if (result != null) {
            this.dataSource.data = result;
            this.isLoading = false;
          }
        },
        error: (error) => {
          console.log(
            "Error ocurred while fetching the order details : ",
            error
          );
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

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
