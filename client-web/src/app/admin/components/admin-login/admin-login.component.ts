import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthenticationService ) { 
    if (this.authService.currentUserValue) { 
      this.router.navigate(['admin/dashboard']);
    }
  }

  async ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || 'admin/dashboard';
    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
/*
    if (await this.authService.checkAuthenticated()) {
      await this.router.navigate([this.returnUrl]);
    }*/
  }


  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
        this.authService.login(username, password).subscribe(
          data => {
            console.log('test 001');
            console.log(data);
            this.router.navigate([this.returnUrl]);
          },
          error => {
            console.log(error);
            this.loginInvalid = true;
          });
    } else {
      this.formSubmitAttempt = true;
    }
  }
  

  hide = true;


  doLogin(): void {
    //let t = this.service.login('admin', 'admin');
    //console.log(t);
    //console.log("Yesssssssssssss" + t);
  }

}
