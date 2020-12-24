import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceHierarchyService } from '../../services/service-hierarchy.service';
import { OrderItemsService } from '../../services/order-items.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  service_data;
  serviceChild_data:any='';
  constructor(public dialogRef: MatDialogRef<ServiceHierarchyService>, public service: ServiceHierarchyService, public orderItem: OrderItemsService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.service_data = data;
  }

  ngOnInit(): void {
    this.getServiceById();
  }

  isShow = true;
  toggleShow($event) {
    this.isShow=$event;
    console.log($event);
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

  addToCart(data) {
    const cartItem = {
      userId:1,
      cartOrOrder : true,
      serviceHierarchyId: data.id,
      quantity: 1,
      paymentType:'',
      price: data.price
    }    
    this.orderItem.create(cartItem)
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
