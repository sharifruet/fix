import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ServiceHierarchyService } from '../../services/service-hierarchy.service'

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {


  service_data;
  serviceChild_data;
  constructor(public dialogRef:MatDialogRef<ServiceHierarchyService>, public service:ServiceHierarchyService, @Inject(MAT_DIALOG_DATA) public data:any) { 
      this.service_data=data;
  }

  ngOnInit(): void {
    this.getServiceById();
  }

  // get service items
  getServiceById():void{
    this.service.getAll()
      .subscribe(data => {
        this.serviceChild_data = data.filter((sh:any) => sh.parentId == this.service_data.id);
      },
      error => {
        console.log(error);
      });
  }

  // service item add to cart
  addToCart(data){
    const value = {
      
    }
    console.log(value);
  }

  isShow:boolean = true;
  toggleShow(){
    this.isShow = ! this.isShow;
  }

  quantity:number = 1;
  i=1;
  plus(){
    if(this.i !=100){
      this.i++;
      this.quantity=this.i;
    }
  }
  minus(){
    if(this.i !=0){
      this.i--;
      this.quantity=this.i;
    }
  }

  

}
