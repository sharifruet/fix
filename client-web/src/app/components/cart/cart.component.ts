import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OrderItemsService } from '../../services/order-items.service';
import { ServiceHierarchyService } from '../../services/service-hierarchy.service';
import { OrdersService } from '../../services/orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { CallToActionService } from '../../services/call-to-action.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  actionSubscription:Subscription;
  
  constructor(
      private _snackBar: MatSnackBar, 
      public service: ServiceHierarchyService, 
      public order: OrdersService, 
      public orderItem: OrderItemsService, 
      private confirmDialog:ConfirmDialogService, 
      private callAction:CallToActionService
    ){
    this.actionSubscription = this.callAction.getAction().subscribe(() => {
      this.getCartId();
    })
  }
  
  ngOnInit(): void {
    this.getCartId();
    this.getServiceById();
  }
  
  @Output() event = new EventEmitter<boolean>();
  isShow= false;
  toggleShow() {
    this.event.emit(this.isShow);
    this.isShow = !this.isShow;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }


  serviceDetail;
  // service data fetched for cart
  getServiceById(): void {
    this.service.getAll()
      .subscribe(
        data => {
          this.serviceDetail = data;
        },
        error => {
          console.log(error);
        }
      );
  }
  
  // get cart id
  getCartId(){
    const cart = {
      userId:1,
      cartOrOrder : true
    }
    this.order.filter(cart)
      .subscribe(
        res => {
          console.log(res);
          if(res.data.length > 0){
            this.getCartItem(res.data[0].id);
          }
        },
        error => {
          console.log(error);
        }
      );
  }
  
  // cart items fetch
  cartItems = [];
  getCartItem(id) {
    const cartItems = {
      orderId:id
    }
    this.orderItem.filter(cartItems)
    .subscribe(
      data => {
        this.cartItems = data.data;
        this.cartItems.forEach(item=>{
          let name = this.serviceDetail.filter((sh: any)=>sh.id==item.serviceHierarchyId);
          if(name.length > 0){
            item.name = name[0].title;
          }
          item.checked = true;
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  getTotal() : number{
    let total = 0;
    this.cartItems.forEach(element => {
      if(element.checked)
       total += (element.price * element.quantity);
    });
    return total;
  }
  
  removeCart(id): void {
    this.confirmDialog.openConfirmDialog('Are you sure to remove this?').afterClosed().subscribe(res => {
      if(res){
        this.orderItem.delete(id)
        .subscribe(
          response => {
            this.getCartId();
            this.callAction.sendAction();
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
      }
    })
  }

  quantity(addQty:number, id:number) {
    let items = this.cartItems.filter(itm=> itm.id ==id);
    if(items.length>0){
      if((items[0].quantity + addQty) > 0){
        items[0].quantity = items[0].quantity + addQty;
        this.orderItem.update(id, {"quantity":items[0].quantity})
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
      }else{
        this.openSnackBar('Quantity must not less than 1');
      }
    }
  }
  

}
