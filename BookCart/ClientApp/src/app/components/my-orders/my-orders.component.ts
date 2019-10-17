import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Order } from 'src/app/models/order';
import { MyordersService } from 'src/app/services/myorders.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('* <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class MyOrdersComponent implements OnInit {

  displayedColumns: string[] = ['orderId', 'orderedOn', 'orderTotal'];
  dataSource = new MatTableDataSource<Order>();
  expandedElement: null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  userId;
  constructor(private orderService: MyordersService) {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit() {
    this.getMyOrderDetails();
    this.dataSource.paginator = this.paginator;
  }

  getMyOrderDetails() {
    this.orderService.myOrderDetails(this.userId).subscribe(
      (result: Order[]) => {
        if (result != null) {
        }
        this.dataSource.data = Object.values(result);
      }, error => {
        console.log('Error ocurred while fetching my order details : ', error);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
