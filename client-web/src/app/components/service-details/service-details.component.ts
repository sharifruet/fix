import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {

  currentService = null;
  message = '';

  constructor(
    private serviceService: ServiceService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getService(this.route.snapshot.paramMap.get('id'));
  }

  getService(id): void {
    this.serviceService.get(id)
      .subscribe(
        data => {
          this.currentService = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status): void {
    const data = {
      title: this.currentService.title,
      description: this.currentService.description,
      published: status
    };

    this.serviceService.update(this.currentService.id, data)
      .subscribe(
        response => {
          this.currentService.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateService(): void {
    this.serviceService.update(this.currentService.id, this.currentService)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The service was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteService(): void {
    this.serviceService.delete(this.currentService.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/services']);
        },
        error => {
          console.log(error);
        });
  }

}
