import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ServiceHierarchyService } from '../../services/service-hierarchy.service';
import {  AddToCartComponent } from '../add-to-cart/add-to-cart.component'

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  panelOpenState = false;
  constructor(public dialog: MatDialog, private route: ActivatedRoute, private service: ServiceHierarchyService, private location: Location) { }
  
  serviceDetail;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      console.log(params);
       let id = params.get('id');
       this.getServiceDetail(id);
   });
  }

  getServiceDetail(id): void {
    this.service.get(id)
      .subscribe(data => {
        this.serviceDetail = data.data;
      },
      error => {
        console.log(error);
      });
  }
  
  

  openAddToCart(){
    const dialogRef = this.dialog.open(AddToCartComponent, {
      width:'900px'
    });
  }


  relatedService:any = {
    dots: false,
    margin:30,
    navSpeed: 700,
    nav: true,
    navText: ['<span class="material-icons">chevron_left</span>', '<span class="material-icons">chevron_right</span>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    }
  }

}
