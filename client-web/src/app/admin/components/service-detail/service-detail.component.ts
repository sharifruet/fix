import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ServiceManageComponent } from '../service-manage/service-manage.component';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {

  serviceDetail;
  
  constructor(public dialogRef:MatDialogRef<ServiceManageComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any) { 
      this.serviceDetail=data;
     }
  
  ngOnInit(): void {
  }

}
