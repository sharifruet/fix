import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
