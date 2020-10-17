import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RolesComponent } from '../../roles/roles.component';
@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.css']
})
export class RoleDetailComponent implements OnInit {

serviceDetail;
  constructor(public dialogRef:MatDialogRef<RolesComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any) { 
      this.serviceDetail=data;
     }

  ngOnInit(): void {
  }

}
