import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  serviceDetail;
  
  constructor(public dialogRef:MatDialogRef<UserService>, 
    @Inject(MAT_DIALOG_DATA) public data:any) { 
      this.serviceDetail=data;
     }
  
  ngOnInit(): void {
  }

}
