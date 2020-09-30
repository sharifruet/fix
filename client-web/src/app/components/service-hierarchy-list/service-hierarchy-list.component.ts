import { Component, OnInit } from '@angular/core';
import { ServiceHierarchyService } from '../../services/service-hierarchy.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service-hierarchy-list',
  templateUrl: './service-hierarchy-list.component.html',
  styleUrls: ['./service-hierarchy-list.component.css']
})
export class ServiceHierarchyListComponent implements OnInit {
 services: any;
  currentService = null;
  currentIndex = -1;
  title = '';
 
  constructor(private serviceHierarchyService: ServiceHierarchyService) { }

  ngOnInit(): void {
	  this.retrieveServices();
  }
  
  retrieveServices(): void {
    this.serviceHierarchyService.getAll()
      .subscribe(
        data => {
          this.services = data;
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

  setActiveServiceHierarchy(service, index): void {
    this.currentService = service;
    this.currentIndex = index;
  }

  removeAllServices(): void {
    this.serviceHierarchyService.deleteAll()
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
    this.serviceHierarchyService.findByTitle(this.title)
      .subscribe(
        data => {
          this.services = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}


