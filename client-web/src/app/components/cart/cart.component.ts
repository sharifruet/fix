import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderItemsService } from '../../services/order-items.service';
import { ServiceHierarchyService } from '../../services/service-hierarchy.service';
import { OrdersService } from '../../services/orders.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ConfirmDialogService} from '../../services/confirm-dialog.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  service_data;
  serviceChild_data;
  constructor(private _snackBar: MatSnackBar, public service: ServiceHierarchyService, public order: OrdersService, public orderItem: OrderItemsService, @Inject(MAT_DIALOG_DATA) public data: any, private confirmDialog:ConfirmDialogService) {
    this.service_data = data;
  }
  
  @Output() event = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.getCartId();
    this.getServiceById();
  }

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

  getServiceById(): void {
    this.service.getAll()
      .subscribe(
        data => {
          this.serviceChild_data = data.filter((sh: any) => sh.parentId == this.service_data.id);
        },
        error => {
          console.log(error);
        }
      );
  }
  
  getCartId(){
    const cart = {
      userId:1,
      cartOrOrder : true
    }
    this.order.filter(cart)
      .subscribe(
        res => {
          console.log(res);
          this.getCartItem(res.data[0].id);
        },
        error => {
          console.log(error);
        }
      );
  }
  
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
          let name = this.serviceChild_data.filter((sh: any)=>sh.id==item.serviceHierarchyId);
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
