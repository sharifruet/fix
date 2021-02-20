import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { OrderItemsService } from '../../services/order-items.service';
import { ServiceHierarchyService } from '../../services/service-hierarchy.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CallToActionService } from '../../services/call-to-action.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @Input() cartItems;
  
  constructor(
      private _snackBar: MatSnackBar, 
      public service: ServiceHierarchyService, 
      public orderItem: OrderItemsService, 
      public dialog:MatDialog,
      public callAction:CallToActionService
    ) {
  }
  
  ngOnInit(): void {
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }
  

  checkedCart(event, id){    
    this.cartItems.forEach(item=>{
      if(item.id == id){
        item.checked = event.checked;
      }
    });
  }
  

  getTotal() : number{
    let total = 0;
    this.cartItems.forEach(element => {
      if(element.checked)
       total += (element.price * element.quantity);
    });
    return total;
  }

  paymentType:string ='';
  orderSubmit(){
    if(this.paymentType == ''){
      this.openSnackBar('Please select a payment method');
    }else{
      this.cartItems.forEach(item=>{
        if(item.checked == true){
          const orderItem = {
            userId:1,
            itemId:item.id,
            cartOrOrder : false,
            paymentType: this.paymentType
          }
          this.orderItem.create(orderItem)
          .subscribe(
            response => {
              console.log(response);
              this.callAction.sendAction();
              this.dialog.closeAll();
              this.openSnackBar('Your order successfully placed');
            },
            error => {
              console.log(error);
            }
          );
        }else{
          this.openSnackBar('Please select a service');
        }
      });
    }
  }
  

  isChecked=true;
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
  
  payments:string[] = ["Bkash", "Bank", "Debit/Credit Card", "Cash on delivery"];

  @Output() event = new EventEmitter<boolean>();
  isShow= true;
  toggleShow() {
    this.event.emit(this.isShow);
    this.isShow = !this.isShow;
  }

}
