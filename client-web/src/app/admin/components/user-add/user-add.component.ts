import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  user = {
    name: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    address: '',
    district: '',
    upazila: '',
    status: ''
  };

  constructor(private userService: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

  createUser(): void {
    const data = {
      name: this.user.name,
      username: this.user.username,
      password: this.user.password,
      email: this.user.email,
      phone: this.user.phone,
      address: this.user.address,
      district: this.user.district,
      upazila: this.user.upazila,
      status: this.user.status
    };

    this.userService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.openSnackBar('The service added successfully!');
          this.newUser();
        },
        error => {
          console.log(error);
        });
  }

  newUser(): void {
    this.user = {
      name: '',
      username: '',
      password: '',
      email: '',
      phone: '',
      address: '',
      district: '',
      upazila: '',
      status: ''
    }
  }

}
