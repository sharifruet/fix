import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users-manage',
  templateUrl: './users-manage.component.html',
  styleUrls: ['./users-manage.component.css']
})
export class UsersManageComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  displayedColumns = ['name', 'username', 'email', 'status', 'action'];
  dataSource = new MatTableDataSource();

  constructor(private service:UserService) { }


  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.service.getAll()
      .subscribe(
        result => {
          this.dataSource = new MatTableDataSource<any>(result.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(result.data);
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

}
