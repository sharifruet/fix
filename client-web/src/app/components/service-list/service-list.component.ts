import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  services: any;
  currentService = null;
  currentIndex = -1;
  title = '';

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.retrieveServices();
  }

  retrieveServices(): void {
    this.serviceService.getAll()
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

}
