import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HowItWorkVideoComponent } from '../how-it-work-video/how-it-work-video.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) {}
  
  openDialog() {
    this.dialog.open(HowItWorkVideoComponent);
  }
  
  ngOnInit(): void {
  }

 

  // owl-carousel for hero slider
  sliderOptions:any = {
    items:1,
    loop:true,
    autoplay:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    nav: false,
    navText: ['<span class="material-icons">chevron_left</span>', '<span class="material-icons">chevron_right</span>'],
  }

  // owl-carousel for service category
  categoryOptions: any = {
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin:10,
    navSpeed: 700,
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
        items: 7
      }
    },
    nav: true
  }

  // owl-carousel for recommend
  recommendOptions: any = {
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin:30,
    navSpeed: 700,
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
        items: 4
      }
    },
    nav: true
  }

  // owl-carousel for testmonial
  testmonialOptions: any = {
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    items:1,
    margin:30,
    navSpeed: 700,
    navText: ['<span class="material-icons">chevron_left</span>', '<span class="material-icons">chevron_right</span>'],
    nav: true
  }



}
