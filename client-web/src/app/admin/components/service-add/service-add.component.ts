import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  constructor(private serviceService: ServiceService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
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
          this.openSnackBar('The service added successfully!');
          this.newService();
        },
        error => {
          console.log(error);
      });
  }

  newService(): void {
    this.service = {
      title: '',
      description: '',
      published: false
    };
  }

}
