import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {BaseService} from './base.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService implements OnInit {

  constructor(http:HttpClient) { 
	  super(http, "/role");
  }

  ngOnInit(){
    console.log("Role Service Init called :)");
  }
}
