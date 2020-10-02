import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class ServiceHierarchyService extends BaseService implements OnInit {
  
  constructor(http:HttpClient) { 
	  super(http, "/services");
  }

  ngOnInit(){
    console.log("ServiceHierarchyService Init called :)");
  }
}