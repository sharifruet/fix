import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceHierarchyService } from '../../services/service-hierarchy.service';
import { OrdersService } from '../../services/orders.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { OrderItemsService } from '../../services/order-items.service';
import {ConfirmDialogService} from '../../services/confirm-dialog.service'

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  service_data;
  serviceChild_data;
  constructor(private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<ServiceHierarchyService>, public service: ServiceHierarchyService, public order: OrdersService, public orderItem: OrderItemsService, @Inject(MAT_DIALOG_DATA) public data: any, private confirmDialog:ConfirmDialogService) {
    this.service_data = data;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    this.getServiceById();
    this.getCart();
  }

  getServiceName(id){
      let name = this.serviceChild_data.filter(sh=>sh.id==id);
      if(name.length > 0)
      return name[0].title;
      return "";
  }

  // get service items
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

  // service item add to cart
  addToCart(data) {
    const cartItem = {
      userId:1,
      cartOrOrder : true,
      serviceHierarchyId: data.id,
      quantity: 1,
      price: data.price
    }
    this.orderItem.create(cartItem)
      .subscribe(
        response => {
          this.getCart();
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }

  // get cart
  cartItems = [];
  getCart() {
    this.orderItem.getAll()
      .subscribe(
        data => {
          this.cartItems = data.data;
        },
        error => {
          console.log(error);
        }
      );
  }

  getTotal() : number{
    let total = 0;
    this.cartItems.forEach(element => {
      total += (element.price * element.quantity);
    });
    return total;
  }

  // remove cart item
  removeCart(id): void {
    this.confirmDialog.openConfirmDialog('Are you sure to remove this?').afterClosed().subscribe(res => {
      if(res){
        this.orderItem.delete(id)
        .subscribe(
          response => {
            this.getCart();
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
      }
    })
  }

  isShow: boolean = true;
  toggleShow() {
    this.isShow = !this.isShow;
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
