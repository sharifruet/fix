import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {
  
  phoneNumber = '';
  signInPhone = new FormControl('', [Validators.required, Validators.pattern('[0-9]{11}')]);
  signUpPhone = new FormControl('', [Validators.required, Validators.pattern('[0-9]{11}')]);
  otpInput = new FormControl('', [Validators.required, Validators.pattern('[0-9]{5}')]);
  logIn : boolean = true;
  signUp : boolean;

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

  ngOnInit(): void {
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }


  // otp form section
  otpSection=false;

  signUpOTP(): void {
    this.loginService.signUpOTP(this.signUpPhone.value)
      .subscribe(
        response => {
          console.log("1");
          console.log(response);
          this.phoneNumber = this.signUpPhone.value;
          this.otpSection = true;
          this.signUp = false;
        },
        error => {
          this.signUpPhone.setErrors({
            exist: true,
          });
          console.log("2");
          console.log(error);
        });
  }

  signInOTP(): void {
    this.loginService.signInOTP(this.signInPhone.value)
      .subscribe(
        response => {
          console.log("1");
          console.log(response);
          this.phoneNumber = this.signInPhone.value;
          this.otpSection = true;
          this.logIn = false;
        },
        error => {
          this.signInPhone.setErrors({
            invalid: true,
          });
          console.log("2");
          console.log(error);
        });
  }

  confirmOTP():void {
    const data = {
      phone: this.phoneNumber,
      otp: this.otpInput.value
    }
    this.loginService.verifyOTP(data)
      .subscribe(
        response => {
          console.log("1");
          console.log(response);
          this.dialog.closeAll();
          this.router.navigate(['/profile/', response.data[0].id]);
        },
        error => {
          this.otpInput.setErrors({
            invalid: true,
          });
          console.log("2");
          console.log(error);
        });
  }




}
