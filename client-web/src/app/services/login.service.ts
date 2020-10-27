import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {BaseService} from './base.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService implements OnInit {

  constructor(http:HttpClient) { 
	  super(http, "/auth");
  }

  signUpOTP(phoneNumber:String): Observable<any> {
    return this.http.get(this.apiBaseUrl+"/otp-signup/"+phoneNumber);
  }


  ngOnInit(){
    console.log("User Service Init called :)");
  }
}
