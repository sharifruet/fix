import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {BaseService} from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService extends BaseService implements OnInit {

  constructor(http:HttpClient) { 
	  super(http, "/services");
  }

  ngOnInit(){
    console.log("ServiceService Init called :)");
  }
}
