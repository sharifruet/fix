import {OnInit, Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ServiceAddComponent } from '../service-add/service-add.component';
import { ServiceDetailComponent } from '../service-detail/service-detail.component';
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-service-hierarchy',
  templateUrl: './service-hierarchy.component.html',
  styleUrls: ['./service-hierarchy.component.css']
})
export class ServiceHierarchyComponent implements OnInit, AfterViewInit {
	services: any;
	currentService = null;
	currentIndex = -1;
	title = '';
	
	displayedColumns = ['title', 'description', 'published', 'details', 'update', 'delete'];
	dataSource = new MatTableDataSource<any>();
	
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(public dialog: MatDialog, private serviceService:ServiceService) {
		
	}
	
	ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog() {
    this.dialog.open(ServiceAddComponent);
  }

  openDetail() {
    this.dialog.open(ServiceDetailComponent);
  }
  
  ngOnInit(): void {
    this.retrieveServices();
  }

  retrieveServices(): void {
    this.serviceService.getAll()
      .subscribe(
        data => {
          this.dataSource = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveServices();
    this.currentService = null;
    this.currentIndex = -1;
  }

  setActiveService(service, index): void {
    this.currentService = service;
    this.currentIndex = index;
  }

  removeAllServices(): void {
    this.serviceService.deleteAll()
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
    this.serviceService.findByTitle(this.title)
      .subscribe(
        data => {
          this.services = data;
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

}
