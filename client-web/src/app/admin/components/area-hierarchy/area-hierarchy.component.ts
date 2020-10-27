import {OnInit, Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AreaHierarchyAddComponent } from '../area-hierarchy-add/area-hierarchy-add.component';
import { AreaHierarchyDetailComponent } from '../area-hierarchy-detail/area-hierarchy-detail.component';
import { AreaHierarchyService } from '../../../services/area-hierarchy.service';
import { AreaHierarchyEditComponent } from '../area-hierarchy-edit/area-hierarchy-edit.component';

@Component({
  selector: 'app-area-hierarchy',
  templateUrl: './area-hierarchy.component.html',
  styleUrls: ['./area-hierarchy.component.css']
})
export class AreaHierarchyComponent implements OnInit {
 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  services: any;
  currentService = null;
  currentIndex = -1;
  title = '';

  
  displayedColumns = ['title', 'areaType', 'parent','hierarchyPath','status','end','action'];
  dataSource = new MatTableDataSource();

  
 constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, private areaHierarchyService:AreaHierarchyService) {
  }

  ngOnInit(): void {
   
    this.retrieveAreaHierarchy();
  }

  retrieveAreaHierarchy(): void {
    this.areaHierarchyService.getAll()
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
   
    const dialogRef = this.dialog.open(AreaHierarchyAddComponent, {
      width:'300px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.refreshList();
    })
  }
  refreshList(): void {
    this.retrieveAreaHierarchy();
    this.currentService = null;
    this.currentIndex = -1;
  }


  viewService(service) {
   
    this.dialog.open(AreaHierarchyDetailComponent, {
      width:'500px',
      data:service
    });
  }

  editService(service) {
    
    const dialogRef = this.dialog.open(AreaHierarchyEditComponent, {
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
    this.areaHierarchyService.delete(id)
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