import { Component, OnInit, HostListener } from '@angular/core';
import { LoginSignupComponent } from '../login-signup/login-signup.component';
import { MatDialog } from '@angular/material/dialog';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  
  isShow: boolean = false;
  topPosToStartShowing = 100;

  @HostListener('window:scroll')
  checkScroll() {
    this.isShow=window.pageYOffset >= 400;
  }

  // TODO: Cross browsing
  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  openLogin(){
    const dialogRef = this.dialog.open(LoginSignupComponent, {
      width:'500px'
    });
  }

  openCart(){
    const dialogRef = this.dialog.open(CartComponent, {
      width:'600px'
    });
  }


}
