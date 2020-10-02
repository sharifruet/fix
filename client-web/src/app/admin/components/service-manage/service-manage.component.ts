import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ServiceAddComponent } from '../service-add/service-add.component';
import { ServiceDetailComponent } from '../service-detail/service-detail.component';
import { ServiceEditComponent } from '../service-edit/service-edit.component';
import { ServiceService } from '../../../services/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-service-manage',
  templateUrl: './service-manage.component.html',
  styleUrls: ['./service-manage.component.css']
})
export class ServiceManageComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  services: any;
  currentService = null;
  currentIndex = -1;
  title = '';
  
  displayedColumns = ['title', 'description', 'published', 'action'];
  dataSource;
  
  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, private serviceService:ServiceService) {
  }

  
  ngOnInit(): void {
    this.retrieveServices();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

  // retrive service
  retrieveServices(): void {
    this.serviceService.getAll()
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
  addServiceDialog() {
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

  deleteService(id): void {
    this.serviceService.delete(id)
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

  

  // setActiveService(service, index): void {
  //   this.currentService = service;
  //   this.currentIndex = index;
  // }

  // removeAllServices(): void {
  //   this.serviceService.deleteAll()
  //     .subscribe(
  //       response => {
  //         console.log(response);
  //         this.retrieveServices();
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

  // searchTitle(): void {
  //   this.serviceService.findByTitle(this.title)
  //     .subscribe(
  //       data => {
  //         this.services = data;
  //         console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }


  

}
