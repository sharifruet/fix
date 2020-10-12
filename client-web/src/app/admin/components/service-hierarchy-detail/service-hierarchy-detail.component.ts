import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ServiceHierarchyService } from '../../../services/service-hierarchy.service';

@Component({
  selector: 'app-service-hierarchy-detail',
  templateUrl: './service-hierarchy-detail.component.html',
  styleUrls: ['./service-hierarchy-detail.component.css']
})
export class ServiceHierarchyDetailComponent implements OnInit {

  serviceDetail;
  
  constructor(public dialogRef:MatDialogRef<ServiceHierarchyService>, 
    @Inject(MAT_DIALOG_DATA) public data:any) { 
      this.serviceDetail=data;
     }
  
  ngOnInit(): void {
  }

}
