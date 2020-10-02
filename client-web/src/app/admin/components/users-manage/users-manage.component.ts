import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

const USERS = [
  {
    id: '1',
    name: 'User1',
    email: 'demo@gmail.com',
    status: 'Active',
    role: 'Admin'
  },
  {
    id: '2',
    name: 'User2',
    email: 'test@gmail.com',
    status: 'Active',
    role: 'Editor'
  },
  {
    id: '3',
    name: 'User3',
    email: 'demo@gmail.com',
    status: 'Inactive',
    role: 'Editor'
  },
  {
    id: '4',
    name: 'User4',
    email: 'demo@gmail.com',
    status: 'Active',
    role: 'Editor'
  },
  {
    id: '5',
    name: 'User5',
    email: 'demo@gmail.com',
    status: 'Active',
    role: 'Contributor'
  },
  {
    id: '6',
    name: 'User6',
    email: 'demo@gmail.com',
    status: 'Active',
    role: 'Editor'
  }

];

@Component({
  selector: 'app-users-manage',
  templateUrl: './users-manage.component.html',
  styleUrls: ['./users-manage.component.css']
})
export class UsersManageComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  displayedColumns = ['name', 'email', 'status', 'role', 'action'];
  dataSource;

  constructor() { }


  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.dataSource = new MatTableDataSource<any>(USERS);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
