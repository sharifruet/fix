import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { AuthenticationService } from '../../services/authentication.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { CallToActionService } from '../../services/call-to-action.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  phoneNumber = '';
  signInPhone = new FormControl('', [Validators.required, Validators.pattern('[0-9]{11}')]);
  signInEmail = new FormControl('', [Validators.required]);
  signInPassword = new FormControl('', [Validators.required]);

  signUpPhone = new FormControl('', [Validators.required, Validators.pattern('[0-9]{11}')]);
  signUpEmail = new FormControl('', [Validators.required]);
  signUpPassword = new FormControl('', [Validators.required, Validators.pattern('[0-9a-zA-Z][^ ]{5,}')]);
  //otpInput = new FormControl('', [Validators.required, Validators.pattern('[0-9]{5}')]);
  logIn: boolean = true;
  signUp: boolean;

  constructor(private callAction:CallToActionService, private authService: AuthenticationService, private dialog: MatDialog, private router: Router, private loginService: LoginService, private _snackBar: MatSnackBar) { }
  ngOnInit(): void {
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

  openSignUp() {
    this.signUp = true;
    this.logIn = false;
  }
  openLogIn() {
    this.signUp = false;
    this.logIn = true;
  }

  signInSubmit(){
    this.authService.login(this.signInEmail.value, this.signInPassword.value)
      .subscribe(
        response => {
          console.log(response);
          this.dialog.closeAll();
          this.router.navigate(['/profile/', response.data.id]);
          this.callAction.sendAction();
        },
        error => {
          console.log("2");
          console.log(error);
        });
  }

  signUpSubmit(){
    const data = {
      phone : this.signUpPhone.value,
      email : this.signUpEmail.value,
      password : this.signUpPassword.value
    }
    this.loginService.signUp(data)
      .subscribe(
        response => {
          console.log(response);
          this.openSnackBar('Registration successfully completed');
          this.signUp = false;
          this.logIn = true;
        },
        error => {
          if(error.status == '302'){
            this.signUpPhone.setErrors({
              exist: true,
            });
          }
          console.log(error);
        });
  }


  // openSignUp() {
  //   this.signUp = true;
  //   this.logIn = false;
  //   this.otpSection = false;
  // }
  // openLogIn() {
  //   this.signUp = false;
  //   this.logIn = true;
  // }

  // login() {
  //   this.otpSection = true;
  //   this.logIn = false;
  // }

 


  // otp form section
  //otpSection = false;

  // signUpOTP(): void {
  //   this.loginService.signUpOTP(this.signUpPhone.value)
  //     .subscribe(
  //       response => {
  //         console.log("1");
  //         console.log(response);
  //         this.phoneNumber = this.signUpPhone.value;
  //         this.otpSection = true;
  //         this.signUp = false;
  //       },
  //       error => {
  //         this.signUpPhone.setErrors({
  //           exist: true,
  //         });
  //         console.log("2");
  //         console.log(error);
  //       });
  // }

  // signInOTP(): void {
  //   this.loginService.signInOTP(this.signInPhone.value)
  //     .subscribe(
  //       response => {
  //         console.log("1");
  //         console.log(response);
  //         this.phoneNumber = this.signInPhone.value;
  //         this.otpSection = true;
  //         this.logIn = false;
  //       },
  //       error => {
  //         this.signInPhone.setErrors({
  //           invalid: true,
  //         });
  //         console.log("2");
  //         console.log(error);
  //       });
  // }

  // confirmOTP(): void {
  //   const data = {
  //     phone: this.phoneNumber,
  //     otp: this.otpInput.value
  //   }
  //   this.authService.otpLogin(data)
  //     .subscribe(
  //       response => {
  //         console.log("1");
  //         console.log(response);
  //         this.dialog.closeAll();
  //         this.router.navigate(['/profile/', response.data[0].id]);
  //         this.callAction.sendAction();
  //       },
  //       error => {
  //         this.otpInput.setErrors({
  //           invalid: true,
  //         });
  //         console.log("2");
  //         console.log(error);
  //       });
  // }




}
