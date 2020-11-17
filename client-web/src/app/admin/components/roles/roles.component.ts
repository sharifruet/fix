import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RoleService } from '../../../services/role.service';
import {RoleAddComponent} from './role-add/role-add.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { PrivilegeAddComponent } from './privilege-add/privilege-add.component';

import { AppSettings } from '../../../app.settings';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})

export class RolesComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

services: any;
  currentService = null;
  currentIndex = -1;
  title = '';
  statusList = AppSettings.STATUS;

  displayedColumns = ['name','description', 'status', 'action'];
  dataSource = new MatTableDataSource();

  constructor(private service:RoleService, public dialog: MatDialog, private _snackBar: MatSnackBar,) { }


  ngOnInit(): void {
    this.getRoles();
  }

  getStatusName(id:number): string {
    let filtered = this.statusList.filter(st=>st.id == id);
    if(filtered.length>0)
      return filtered[0].value;
    return "";
  }

  getRoles(): void {
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

  addDialog = ()=>{
    const dialogRef = this.dialog.open(RoleAddComponent, {
      width:'300px'
    });
    
    dialogRef.afterClosed().subscribe(result=>{
      this.refreshList();
    })
  }
  
  refreshList(): void {
    //this.retrieveServices();
    this.currentService = null;
    this.currentIndex = -1;
  }
  
  viewService(service) {
    this.dialog.open(RoleDetailComponent, {
      width:'300px',
      data:service
    });
  }

  editService(service) {
    const dialogRef = this.dialog.open(RoleEditComponent, {
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
  
  privilegeAdd(): void {
    const dialogRef = this.dialog.open(PrivilegeAddComponent, {
      width: '400px',
      data: {}
    });
  
}
}

