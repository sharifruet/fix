import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RolesComponent } from '../roles/roles.component';
import { RoleService } from '../../../services/role.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSettings } from '../../../app.settings';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-privilege-add',
  templateUrl: './privilege-add.component.html',
  styleUrls: ['./privilege-add.component.css']
})
export class PrivilegeAddComponent implements OnInit {
	roles ;
  constructor(private _snackBar: MatSnackBar,private service:RoleService){ }

  ngOnInit(): void {
	  this.getRoles();
  }
  
  
  getRoles(): void {
    this.service.getAll()
      .subscribe(
        result => {
			if(result.status ==0){
				this.roles = result.data;
			  console.log(result.data);
			}else{
				console.log(result.message);
			}
        },
        error => {
          console.log(error);
        });
  }
  
   openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }
  
   updateService(): void {
    this.service.update(this.roles.id, this.roles)
      .subscribe(
        response => {
          console.log(response);
          this.openSnackBar('The service updated successfully!');
        },
        error => {
          console.log(error);
        });
  } 

}
