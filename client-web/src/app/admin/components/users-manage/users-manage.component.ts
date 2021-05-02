import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../services/user.service';
import { UserAddComponent } from '../user-add/user-add.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { ConfirmDialogService } from '../../../services/confirm-dialog.service';


@Component({
  selector: 'app-users-manage',
  templateUrl: './users-manage.component.html',
  styleUrls: ['./users-manage.component.css']
})

export class UsersManageComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  services: any;
  currentService = null;
  currentIndex = -1;
  title = '';

  displayedColumns = ['name', 'username', 'email', 'phone', 'address', 'district', 'upazila', 'status', 'action'];
  dataSource = new MatTableDataSource();

  constructor(private userService: UserService, public dialog: MatDialog, private _snackBar: MatSnackBar, private confirmDialog: ConfirmDialogService) { }

  ngOnInit(): void {
    this.getUsersManage();
  }

  getUsersManage(): void {
    this.userService.getAll()
      .subscribe(
        result => {
          if (result.status == 0) {
            this.dataSource = new MatTableDataSource<any>(result.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            console.log(result.data);
          } else {
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

  addUserDialog = () => {
    const dialogRef = this.dialog.open(UserAddComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refreshList();
    })
  }

  getAreaName(areaId: number): string {
    return " " + areaId;
  }

  refreshList(): void {
    this.getUsersManage();
    this.currentService = null;
    this.currentIndex = -1;
  }

  viewUser(user) {
    this.dialog.open(UserDetailComponent, {
      width: '500px',
      data: user
    });
  }

  editUser(user) {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '500px',
      data: user
    });
    dialogRef.afterClosed().subscribe(result => {
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

  deleteUser(id): void {
    this.confirmDialog.openConfirmDialog('Are you sure to delete this?').afterClosed().subscribe(res => {
      if (res) {
        this.userService.delete(id)
          .subscribe(
            response => {
              console.log(response);
              this.openSnackBar('The user deleted successfully');
              this.refreshList();
            },
            error => {
              console.log(error);
            }
          );
      }
    })
  }


}

