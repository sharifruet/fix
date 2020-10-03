import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {BaseService} from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService implements OnInit {

  constructor(http:HttpClient) { 
	  super(http, "/user");
  }

  ngOnInit(){
    console.log("User Service Init called :)");
  }
}
