import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderItemPaymentService } from '../../../services/order-item-payment.service';

@Component({
  selector: 'app-order-item-payment',
  templateUrl: './order-item-payment.component.html',
  styleUrls: ['./order-item-payment.component.css']
})
export class OrderItemPaymentComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  services: any;
  currentService = null;
  currentIndex = -1;
  title = '';

  displayedColumns = ['orderItemId','amount', 'paymentStatus','paymentDate','returnDate', 'action'];
  dataSource = new MatTableDataSource();

  constructor(private orders:OrderItemPaymentService, public dialog: MatDialog, private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.getOrderItemPayment();
  }

  getOrderItemPayment(): void {
    this.orders.getAll()
      .subscribe(
        result => {
			if(result.status ==0){
			  this.dataSource = new MatTableDataSource<any>(result.data);
			  this.dataSource.paginator = this.paginator;
			  this.dataSource.sort = this.sort;
			  console.log(result.data);
			}else{
				console.log(result.message);
			}
        },
        error => {
          console.log(error);
        });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  
  refreshList(): void {
    this.getOrderItemPayment();
    this.currentService = null;
    this.currentIndex = -1;
  }


  
    openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

  // view order
  viewOrderPayment(id):void{
    
  }

  deleteOrderPayment(id): void {
   if(confirm("Are you sure to delete?")){
    this.orders.delete(id)
    .subscribe(
      response => {
        console.log(response);
        this.openSnackBar('The order item payment deleted successfully');
        this.refreshList();
      },
      error => {
        console.log(error);
      });
   }
  }

  
}