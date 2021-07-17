import { Component, OnInit, HostListener } from '@angular/core';
import { LoginSignupComponent } from '../login-signup/login-signup.component';
import { MatDialog } from '@angular/material/dialog';
import { ServiceHierarchyService } from '../../services/service-hierarchy.service';
import { CartComponent } from '../cart/cart.component';
import { OrdersService } from '../../services/orders.service';
import { OrderItemsService } from '../../services/order-items.service';
import { CallToActionService } from '../../services/call-to-action.service';
import { AuthenticationService } from '../../services/authentication.service'
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  actionSubscription:Subscription;
  serviceHierarchies:any = [];
  initalParent:number = 1;
  topLevelMenu : any;
  user:any;

  constructor(
    private router: Router,
    private authService:AuthenticationService,
    public dialog: MatDialog, 
    private servicehierarchy:ServiceHierarchyService,
    private order:OrdersService,
    private orderItem:OrderItemsService,
    private callAction:CallToActionService
    ) { 
      this.actionSubscription = this.callAction.getAction().subscribe(() => {
        this.getCartId();
        this.currentUser();
      })
     }

  ngOnInit(): void {
    this.getServiceHierarchyParent();
    this.getCartId();
    this.currentUser();
  }

  currentUser(){
    this.user = this.authService.currentUserValue;
    console.log(this.user);
  }

  logout():void{
    this.authService.logout();
    this.router.navigate(['home']);
    this.currentUser();
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
      },
      error => {
        console.log(error);
      }
    );
  }
  

  getServiceHierarchyParent(){
    this.servicehierarchy.getAll().subscribe(data=>{
      this.serviceHierarchies = data;
      this.topLevelMenu = this.serviceHierarchies.filter((sh:any) => sh.parentId == -1);
      this.serviceHierarchies.forEach(element => {
        element.children = this.getChildren(element.id);
      });
    });
  }
  
  getChildren(parentId : number){
    let c = this.serviceHierarchies.filter((sh:any) => sh.parentId == parentId);
    return c;
  }

  changeTopLevelMenu(id : number): void{
    this.initalParent = id;
  }

  getSecondLevelMenu(): any[]{
    return this.serviceHierarchies.filter((sh) => sh.parentId == this.initalParent);
  }

  isSticky: boolean = false;

  @HostListener('window:scroll')
  checkScroll() {
    this.isSticky = window.pageYOffset >= 64;
  }

  openCart(){
    const dialogRef = this.dialog.open(CartComponent, {
      width:'600px'
    });
  }

  openLogin(){
    const dialogRef = this.dialog.open(LoginSignupComponent, {
      width:'500px',
      disableClose: false
    });
  }
}
