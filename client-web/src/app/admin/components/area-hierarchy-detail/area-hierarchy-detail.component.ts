import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AreaHierarchyService } from '../../../services/area-hierarchy.service';

@Component({
  selector: 'app-area-hierarchy-detail',
  templateUrl: './area-hierarchy-detail.component.html',
  styleUrls: ['./area-hierarchy-detail.component.css']
})
export class AreaHierarchyDetailComponent implements OnInit {

  serviceDetail;

  constructor(public dialogRef:MatDialogRef<AreaHierarchyService>, 
    @Inject(MAT_DIALOG_DATA) public data:any) { 
      this.serviceDetail=data;
     }

  ngOnInit(): void {
  }

}