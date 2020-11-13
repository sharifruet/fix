import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderItemsService } from '../../../services/order-items.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  services: any;
  currentService = null;
  currentIndex = -1;
  title = '';

  displayedColumns = ['orderId','serviceHierarchyId', 'serviceProviderId','areaHierarchyId','quantity','price','deliveryDate','orderStatus', 'action'];
  dataSource = new MatTableDataSource();

  constructor(private orders:OrderItemsService, public dialog: MatDialog, private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.getOrderItem();
  }

  getOrderItem(): void {
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
    this.getOrderItem();
    this.currentService = null;
    this.currentIndex = -1;
  }


  
    openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

  // view order
  viewOrderItem(id):void{
    
  }

  deleteOrderItem(id): void {
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