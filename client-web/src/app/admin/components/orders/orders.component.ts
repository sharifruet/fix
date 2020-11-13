import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrdersService } from '../../../services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

services: any;
  currentService = null;
  currentIndex = -1;
  title = '';

  displayedColumns = ['orderNumber','userId', 'cartOrOrder','orderDate','paymentType', 'action'];
  dataSource = new MatTableDataSource();

  constructor(private orders:OrdersService, public dialog: MatDialog, private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
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
    this.getOrders();
    this.currentService = null;
    this.currentIndex = -1;
  }


  
    openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

  // view order
  viewOrder(id):void{
    
  }

  deleteOrder(id): void {
   if(confirm("Are you sure to delete?")){
    this.orders.delete(id)
    .subscribe(
      response => {
        console.log(response);
        this.openSnackBar('The order deleted successfully');
        this.refreshList();
      },
      error => {
        console.log(error);
      });
   }
  }

  
}