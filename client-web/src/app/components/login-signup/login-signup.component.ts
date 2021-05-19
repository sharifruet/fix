import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {
  
  logIn : boolean = true;
  signUp : boolean;
  phoneNumber:string = '';
  otpInput;

  constructor(private dialog:MatDialog, private router:Router, private loginService: LoginService, private _snackBar: MatSnackBar) { }

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
    this.loginService.signUpOTP(this.phoneNumber)
      .subscribe(
        response => {
          console.log("1");
          console.log(response);
          this.otpSection = true;
          this.signUp = false;
        },
        error => {
          console.log("2");
          console.log(error);
        });
  }


  signUpConfirm():void {
    const data = {
      phone: this.phoneNumber,
      otp: this.otpInput
    }
    this.loginService.verifyOTP(data)
      .subscribe(
        response => {
          console.log("1");
          console.log(response);
          this.dialog.closeAll();
          this.openSnackBar('OTP verified');
          this.router.navigate(['/profile/', response.data[0].id]);
        },
        error => {
          console.log("2");
          console.log(error);
          this.openSnackBar('OTP not verified');
        });
  }




}
