import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  hide = true;
  openAnother() {
    this.hide = !this.hide;
  }

  user = {
    name: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    otp: '1234',
    address: '',
    district: '',
    upazila: '',
    status: ''
  };

  constructor(private userservice: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }


  // otp form section
  otpSection=true;

  save(): void {
    console.log(this.userservice);
    const data = {
      name: this.user.name,
      username: this.user.username,
      password: this.user.password,
      email: this.user.email,
      phone: this.user.phone,
      otp: this.user.otp,
      address: this.user.address,
      district: this.user.district,
      upazila: this.user.upazila,
      status: this.user.status
    };

    this.userservice.create(data)
      .subscribe(
        response => {
          console.log("1");
          console.log(response);
          // this.openSnackBar('The user added successfully!');
          this.otpSection = !this.otpSection;
        },
        error => {
          console.log("2");
          console.log(error);
        });
  }





}
