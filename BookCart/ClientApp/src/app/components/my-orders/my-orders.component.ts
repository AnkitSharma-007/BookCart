import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatNoDataRow } from "@angular/material/table";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Order } from "src/app/models/order";
import { MyordersService } from "src/app/services/myorders.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MatButton } from "@angular/material/button";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { RouterLink } from "@angular/router";
import { MatInput } from "@angular/material/input";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { NgIf, NgFor, CurrencyPipe, DatePipe } from "@angular/common";
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from "@angular/material/card";

@Component({
    selector: "app-my-orders",
    templateUrl: "./my-orders.component.html",
    styleUrls: ["./my-orders.component.scss"],
    animations: [
        trigger("detailExpand", [
            state("collapsed, void", style({ height: "0px", minHeight: "0", display: "none" })),
            state("expanded", style({ height: "*" })),
            transition("* <=> *", animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")),
        ]),
    ],
    standalone: true,
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        NgIf,
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
        NgFor,
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
  displayedColumns: string[] = ["orderId", "orderedOn", "orderTotal"];
  dataSource = new MatTableDataSource<Order>();
  expandedElement: null;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.dataSource.paginator = mp;
  }
  userId;
  isLoading: boolean;
  private unsubscribe$ = new Subject<void>();

  constructor(private orderService: MyordersService) {
    this.userId = localStorage.getItem("userId");
  }

  ngOnInit() {
    this.isLoading = true;
    this.getMyOrderDetails();
  }

  getMyOrderDetails() {
    this.orderService
      .myOrderDetails(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (result: Order[]) => {
          if (result != null) {
            this.dataSource.data = Object.values(result);
            this.isLoading = false;
          }
        },
        error: (error) => {
          console.log(
            "Error ocurred while fetching my order details : ",
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
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
