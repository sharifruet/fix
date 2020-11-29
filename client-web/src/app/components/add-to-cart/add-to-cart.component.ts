import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceHierarchyService } from '../../services/service-hierarchy.service';
import { OrdersService } from '../../services/orders.service';
import { OrderItemsService } from '../../services/order-items.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  service_data;
  serviceChild_data;
  constructor(public dialogRef: MatDialogRef<ServiceHierarchyService>, public service: ServiceHierarchyService, public order: OrdersService, public orderItem: OrderItemsService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.service_data = data;
  }

  ngOnInit(): void {
    this.getServiceById();
    this.getCart();
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
          console.log("1");
          this.getCart();
          console.log(response);
        },
        error => {
          console.log("2");
          console.log(error);
        }
      );
  }

  // get cart
  cartItems;
  cartTotal = 0;

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

  // remove cart item
  removeCart(id): void {
    if (confirm('Are you sure to remove?')) {
      this.orderItem.delete(id)
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
    }
  }

  isShow: boolean = true;
  toggleShow() {
    this.isShow = !this.isShow;
  }

  quantity: number = 1;
  i = 1;
  plus() {
    if (this.i != 100) {
      this.i++;
      this.quantity = this.i;
    }
  }
  minus() {
    if (this.i != 0) {
      this.i--;
      this.quantity = this.i;
    }
  }



}
