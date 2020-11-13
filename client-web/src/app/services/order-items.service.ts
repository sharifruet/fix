import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class OrderItemsService extends BaseService implements OnInit{

  constructor(http:HttpClient) { 
	  super(http, "/orderItems");
  }

  ngOnInit(){
    console.log("Order Items Init called :)");
  }
}
