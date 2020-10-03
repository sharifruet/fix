import {OnInit, Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ServiceAddComponent } from '../service-add/service-add.component';
import { ServiceDetailComponent } from '../service-detail/service-detail.component';
import { ServiceHierarchyService } from '../../../services/service-hierarchy.service';
import { ServiceEditComponent } from '../service-edit/service-edit.component';

@Component({
  selector: 'app-service-hierarchy',
  templateUrl: './service-hierarchy.component.html',
  styleUrls: ['./service-hierarchy.component.css']
})
export class ServiceHierarchyComponent implements OnInit {
  comp = {title:"Service-hierarchy"};
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  services: any;
  currentService = null;
  currentIndex = -1;
  title = '';
  
  displayedColumns = ['title', 'description', 'published','parent', 'hierarchyPath','serviceLayer','end','action'];
  dataSource = new MatTableDataSource<any>();
  
  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, private service:ServiceHierarchyService) {
  }

  ngOnInit(): void {
    this.retrieveServices();
  }

  retrieveServices(): void {
    this.service.getAll()
      .subscribe(
        data => {
          this.dataSource = new MatTableDataSource<any>(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(data);
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

  // add service dialog
  addItemDialog() {
    const dialogRef = this.dialog.open(ServiceAddComponent, {
      width:'300px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.refreshList();
    })
  }
  refreshList(): void {
    this.retrieveServices();
    this.currentService = null;
    this.currentIndex = -1;
  }


  viewService(service) {
    this.dialog.open(ServiceDetailComponent, {
      width:'300px',
      data:service
    });
  }

  editService(service) {
    const dialogRef = this.dialog.open(ServiceEditComponent, {
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

  removeAllServices(): void {
    this.service.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveServices();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.service.findByTitle(this.title)
      .subscribe(
        data => {
          this.services = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
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