import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UsersManageComponent } from '../users-manage/users-manage.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  currentUser;
  
  constructor(private _snackBar: MatSnackBar, private userService:UserService, public dialogRef:MatDialogRef<UsersManageComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any) { 
      this.currentUser=data;
     }
  
  ngOnInit(): void {
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

  updateUser(): void {
    this.userService.update(this.currentUser.id, this.currentUser)
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
