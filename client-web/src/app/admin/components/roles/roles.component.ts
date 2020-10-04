import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RoleService } from '../../../services/role.service';
import {RoleAddComponent} from './role-add/role-add.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})

export class RolesComponent implements OnInit {

  comp = {title:"Roles"};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  displayedColumns = ['name', 'description', 'status', 'action'];
  dataSource = new MatTableDataSource();

  constructor(private service:RoleService, public dialog: MatDialog, private _snackBar: MatSnackBar,) { }


  ngOnInit(): void {
    this.getRoles();
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
      //this.refreshList();
    })
  }

}
