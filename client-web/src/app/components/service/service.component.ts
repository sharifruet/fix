import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  AddToCartComponent } from '../add-to-cart/add-to-cart.component'

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  panelOpenState = false;

  constructor(public dialog: MatDialog) { }
  
  ngOnInit(): void {
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
