import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  user = {
    name: '',
    email: '',
    status: ''
  };

  constructor(private service: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

  save(): void {
    const data = {
      name: this.user.name,
      email: this.user.email,
	  status: this.user.status
    };

    this.service.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.openSnackBar('The service added successfully!');
          this.newService();
        },
        error => {
          console.log(error);
      });
  }

  newService(): void {
    this.user = {
      name: '',
      email: '',
      status: ''
    }
  }

}
