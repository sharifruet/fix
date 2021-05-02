import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../services/role.service';
import {MatSnackBar} from '@angular/material/snack-bar';

import { AppSettings } from '../../../app.settings';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.css']
})
export class RoleAddComponent implements OnInit {

  role = {
    name: '',
    description: '',
    status: 0
  };
  statusList = AppSettings.STATUS;
  
  errorMessage="test 123";

  constructor(private service: RoleService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

  save(): void {
    const data = this.role;

    this.service.create(data)
      .subscribe(
        response => {
			console.log(1);
          console.log(response);
		  if (response.status==0){
			this.openSnackBar('The service added successfully!');
			this.newService();
		  }
		  else {
			 this.errorMessage=response.message;
		  }
        },
        error => {
			console.log(2);
			this.errorMessage=error.error.message;
			
			console.log(this.errorMessage);
          console.log(error);
      });
  }

  newService(): void {
    this.role = {
      name: '',
      description: '',
      status: 0
    };
  }

}
