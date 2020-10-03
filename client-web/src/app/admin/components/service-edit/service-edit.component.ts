import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ServiceManageComponent } from '../service-manage/service-manage.component';
import { ServiceService } from '../../../services/service.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.css']
})
export class ServiceEditComponent implements OnInit {

  currentService;
  
  constructor(private _snackBar: MatSnackBar, private serviceService:ServiceService, public dialogRef:MatDialogRef<ServiceManageComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any) { 
      this.currentService=data;
     }
  
  ngOnInit(): void {
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

  updateService(): void {
    this.serviceService.update(this.currentService.id, this.currentService)
      .subscribe(
        response => {
          console.log(response);
          this.openSnackBar('The service updated successfully!');
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
          this.openSnackBar('The service updated successfully!');
        },
        error => {
          console.log(error);
        });
  }
}
