import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../services/user.service';

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

  constructor(private service:UserService, public dialog: MatDialog, private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getAreaName(areaId: number) : string{
    return "Test "+areaId;
  }
  
  refreshList(): void {
    //this.retrieveServices();
    this.currentService = null;
    this.currentIndex = -1;
  }


  
    openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

setActiveService(service, index): void {
    this.currentService = service;
    this.currentIndex = index;
  }

deleteService(id): void {
    this.service.delete(id)
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