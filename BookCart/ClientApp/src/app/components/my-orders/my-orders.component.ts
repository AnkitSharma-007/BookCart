import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { AsyncPipe, CurrencyPipe, DatePipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
} from "@angular/core";
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
import { Store } from "@ngrx/store";
import { BehaviorSubject, combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { LoadingState } from "src/app/shared/call-state";
import { loadOrders } from "src/app/state/actions/order.actions";
import {
  selectOrderCallState,
  selectOrderItems,
} from "src/app/state/selectors/order.selectors";

@Component({
    selector: "app-my-orders",
    templateUrl: "./my-orders.component.html",
    styleUrls: ["./my-orders.component.scss"],
    animations: [
        trigger("detailExpand", [
            state("collapsed,void", style({ height: "0px", minHeight: "0" })),
            state("expanded", style({ height: "*" })),
            transition("expanded <=> collapsed", animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
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
        AsyncPipe,
    ]
})
export class MyOrdersComponent {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  private readonly store = inject(Store);
  loadingState = LoadingState;

  displayedColumns: string[] = ["orderId", "orderDate", "cartTotal"];
  expandedElement: null;

  private readonly searchValue$ = new BehaviorSubject<string>("");

  orderTableData$ = combineLatest([
    this.store.select(selectOrderItems),
    this.store.select(selectOrderCallState),
    this.searchValue$,
  ]).pipe(
    map(([order, callState, searchValue]) => {
      let dataSource = new MatTableDataSource(order);
      dataSource.paginator = this.paginator;
      if (searchValue.length > 0) {
        dataSource.filter = searchValue.trim().toLowerCase();
        dataSource.paginator.firstPage();
      }
      return { dataSource, callState };
    })
  );

  constructor() {
    this.store.dispatch(loadOrders());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchValue$.next(filterValue);
  }
}
