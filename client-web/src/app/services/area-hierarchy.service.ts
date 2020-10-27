import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class AreaHierarchyService extends BaseService implements OnInit {
  
  constructor(http:HttpClient) { 
	  super(http, "/area-hierarchy");
  }

  ngOnInit(){
    console.log("AreaHierarchyService Init called :)");
  }
}