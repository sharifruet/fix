import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ServiceHierarchyService } from '../../services/service-hierarchy.service';
import {  AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  panelOpenState = false;
  constructor(public dialog: MatDialog, private route: ActivatedRoute, private service: ServiceHierarchyService, private location: Location, private mediaService:MediaService) { }
  
  mediaAll:any = [];
  serviceDetail:any = [];
  serviceChild:any = [];
  ngOnInit(): void {
    this.getImages();
    this.route.paramMap.subscribe(params => { 
       let id = params.get('id');
       this.getServiceDetail(id);
   });
  }
  

  getServiceDetail(id): void {
    this.service.getAll()
      .subscribe(data => {
        this.serviceDetail = data.filter((sh:any) => sh.id == id);
        this.serviceDetail[0].faq = JSON.parse(this.serviceDetail[0].faq);
        this.serviceChild = data.filter((sh:any) => sh.parentId == id);
        this.serviceChild.forEach(element => {
          if(element.photo !== null){
            element.photoPath = this.getImage(element.photo);
          }
        });
        console.log(this.serviceDetail[0]);
        
        // console.log(this.serviceChild);
      },
      error => {
        console.log(error);
      });
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
  

  openAddToCart(service){
    const dialogRef = this.dialog.open(AddToCartComponent, {
      width:'900px',
      data:service
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
