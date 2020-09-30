import { Component, OnInit } from '@angular/core';
import { ServiceHierarchyService } from '../../services/service-hierarchy.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service-hierarchy-details',
  templateUrl: './service-hierarchy-details.component.html',
  styleUrls: ['./service-hierarchy-details.component.css']
})
export class ServiceHierarchyDetailsComponent implements OnInit {

  currentService = null;
  message = '';

  constructor(
    private serviceHierarchyService: ServiceHierarchyService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getService(this.route.snapshot.paramMap.get('id'));
  }

  getService(id): void {
    this.serviceHierarchyService.get(id)
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
      parentId: this.currentService.parentId,
      isServiceLayer: this.currentService.isServiceLayer,
      isEnd: this.currentService.isEnd,
      published: status
    };

    this.serviceHierarchyService.update(this.currentService.id, data)
      .subscribe(
        response => {
          this.currentService.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateServiceHierarchy(): void {
    this.serviceHierarchyService.update(this.currentService.id, this.currentService)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The service was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteServiceHierarchy(): void {
    this.serviceHierarchyService.delete(this.currentService.id)
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

