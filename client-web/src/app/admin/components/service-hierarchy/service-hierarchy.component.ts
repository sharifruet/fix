import {OnInit, Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ServiceHierarchyAddComponent } from '../service-hierarchy-add/service-hierarchy-add.component';
import { ServiceHierarchyDetailComponent } from '../service-hierarchy-detail/service-hierarchy-detail.component';
import { ServiceHierarchyService } from '../../../services/service-hierarchy.service';
import { ServiceHierarchyEditComponent } from '../service-hierarchy-edit/service-hierarchy-edit.component';

@Component({
  selector: 'app-service-hierarchy',
  templateUrl: './service-hierarchy.component.html',
  styleUrls: ['./service-hierarchy.component.css']
})
export class ServiceHierarchyComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  services: any;
  currentService = null;
  currentIndex = -1;
  title = '';
  serviceHierarchies : any[] = [];
  
  displayedColumns = ['title', 'description', 'published','parent','serviceLayer','end','status','action'];
  dataSource = new MatTableDataSource();
  
 constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, private serviceHierarchyService:ServiceHierarchyService) {
  }

  ngOnInit(): void {
    this.retrieveServiceHierarchy();
  }


  getParentName(parentId: number) : string {
    let parent = this.serviceHierarchies.filter(sh=>sh.id==parentId);
    if(parent.length > 0)
      return parent[0].title;
    return "";
  }

  retrieveServiceHierarchy(): void {
    this.serviceHierarchyService.getAll()
      .subscribe(
        data => {
          this.serviceHierarchies = data;
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

  // add serviceHierarchy dialog
  addItemDialog() {
    const dialogRef = this.dialog.open(ServiceHierarchyAddComponent, {
      width:'500px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.refreshList();
    })
  }
  refreshList(): void {
    this.retrieveServiceHierarchy();
    this.currentService = null;
    this.currentIndex = -1;
  }


  viewService(service) {
    this.dialog.open(ServiceHierarchyDetailComponent, {
      width:'450px',
      data:service
    });
  }

  editService(service) {
    const dialogRef = this.dialog.open(ServiceHierarchyEditComponent, {
      width:'500px',
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
    if(confirm('Are you sure to delete')){
      this.serviceHierarchyService.delete(id)
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



}