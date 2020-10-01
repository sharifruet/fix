import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.css']
})
export class ServiceAddComponent implements OnInit {

  service = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
  }

  saveService(): void {
    const data = {
      title: this.service.title,
      description: this.service.description
    };

    this.serviceService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
      });
  }

  newService(): void {
    this.submitted = false;
    this.service = {
      title: '',
      description: '',
      published: false
    };
  }

}
