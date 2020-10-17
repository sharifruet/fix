import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RolesComponent } from '../../roles/roles.component';
import { RoleService } from '../../../../services/role.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {

  currentService;
  
  constructor(private _snackBar: MatSnackBar, private roleService:RoleService, public dialogRef:MatDialogRef<RolesComponent>, 
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
    this.roleService.update(this.currentService.id, this.currentService)
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
