import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {
  
  logIn : boolean = true;
  signUp : boolean;
  phoneNumber:string = '';

  constructor(private userservice: UserService, private loginService: LoginService, private _snackBar: MatSnackBar) { }

  openSignUp() {

    this.signUp = true;
    this.logIn = false;
    this.otpSection = false;

  }
  openLogIn(){
    this.signUp = false;
    this.logIn = true;
  }

  login(){
    this.otpSection = true;
    this.logIn = false;
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

  

  ngOnInit(): void {
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }


  // otp form section
  otpSection=false;

  sendOTP(): void {
    console.log(this.phoneNumber);


    this.loginService.signUpOTP(this.phoneNumber)
      .subscribe(
        response => {
          console.log("1");
          console.log(response);
          // this.openSnackBar('The user added successfully!');
          this.otpSection = true;
          this.signUp = false;
        },
        error => {
          console.log("2");
          console.log(error);
        });
  }





}
