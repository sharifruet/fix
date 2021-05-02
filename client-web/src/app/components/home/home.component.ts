import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HowItWorkVideoComponent } from '../how-it-work-video/how-it-work-video.component';
import { ServiceHierarchyService } from '../../services/service-hierarchy.service';
import { MediaService } from '../../services/media.service';
import { SlidersService } from '../../services/sliders.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mediaAll:any = [];
  sliders:any = [];
  
  constructor(private sliderService:SlidersService, public dialog: MatDialog, private serviceHierarchies:ServiceHierarchyService, private mediaService:MediaService) {}
  
  openDialog() {
    this.dialog.open(HowItWorkVideoComponent);
  }
  
  ngOnInit(): void {
    this.getImages();
    this.services();
    this.getSliders();
  }

  getSliders():void{
    this.sliderService.getAll()
    .subscribe(
      data => {
        this.sliders = data;
        console.log(data);
        this.sliders.forEach(element => {
            element.photoPath = this.getImage(element.photo);
        });
      },
      error => {
        console.log(error);
      }
    )
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

  sevicesList:any=[];
  serviceGroup:any=[];
  serviceLayer:any=[];
  services():void{
    this.serviceHierarchies.getAll()
    .subscribe(
      data => {
        this.sevicesList= data;
        this.serviceGroup = this.sevicesList.filter((sh:any) => sh.serviceGroup == 1);
        this.serviceLayer = this.sevicesList.filter((sh:any) => sh.serviceLayer == 1);
        this.serviceGroup.forEach(element => {
          if(element.photo !== null){
            element.photoPath = this.getImage(element.photo);
          }
        });
        this.serviceLayer.forEach(element => {
          if(element.photo !== null){
            element.photoPath =this.getImage(element.photo);
          }
        });

        console.log(this.serviceGroup);
      },
      error => {
        console.log(error);
      }
    );
  }

  getImages(){
    this.mediaService.getAll().subscribe(
      data => {
        this.mediaAll = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  
  getImage(id:number){
      let c = this.mediaAll.find((sh:any) => sh.id == id);
      return this.mediaService.mediaPath + c.name;
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
