import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class SlidersService extends BaseService implements OnInit {

  constructor(http:HttpClient) { 
    super(http, '/sliders');
  }

  ngOnInit(){
    console.log("Sliders init called");
  }
}
