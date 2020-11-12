import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends BaseService implements OnInit{

  constructor(http:HttpClient) { 
	  super(http, "/orders");
  }

  ngOnInit(){
    console.log("Orders Init called :)");
  }


}