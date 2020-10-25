import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../services/user.service';
import {UserAddComponent} from './user-add/user-add.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {UserDetailComponent} from './user-detail/user-detail.component';

@Component({
  selector: 'app-users-manage',
  templateUrl: './users-manage.component.html',
  styleUrls: ['./users-manage.component.css']
})

export class UsersManageComponent implements OnInit {
//selectedValue: string;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

services: any;
  currentService = null;
  currentIndex = -1;
  title = '';

  displayedColumns = ['name','username', 'email','phone','address','district','upazila', 'status', 'action'];
  dataSource = new MatTableDataSource();

  constructor(private service:UserService, public dialog: MatDialog, private _snackBar: MatSnackBar,) { }


  ngOnInit(): void {
    this.getUsersManage();
  }

  getUsersManage(): void {
    this.service.getAll()
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

  addUserDialog = ()=>{
    const dialogRef = this.dialog.open(UserAddComponent, {
      width:'300px'
    });
    
    dialogRef.afterClosed().subscribe(result=>{
      this.refreshList();
    })
  }

  getAreaName(areaId: number) : string{
    return "Test "+areaId;
  }
  
  refreshList(): void {
    //this.retrieveServices();
    this.currentService = null;
    this.currentIndex = -1;
  }
  
  viewService(service) {
    this.dialog.open(UserDetailComponent, {
      width:'300px',
      data:service
    });
  }

  editService(service) {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width:'300px',
      data:service
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.refreshList();
    })
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
          this.openSnackBar('The service deleted successfully');
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }
  
}
