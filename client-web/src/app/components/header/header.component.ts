import { Component, OnInit, HostListener } from '@angular/core';
import { LoginSignupComponent } from '../login-signup/login-signup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  isSticky: boolean = false;

  @HostListener('window:scroll')
  checkScroll() {
    this.isSticky = window.pageYOffset >= 64;
  }

  openLogin(){
    const dialogRef = this.dialog.open(LoginSignupComponent, {
      width:'600px'
    });
  }

  showCommercial:boolean = true;
  showHousehold:boolean = false;

  toggleCommercial(){
    this.showHousehold=false;
    this.showCommercial=true;
  }
  toggleHousehold(){
    this.showCommercial=false;
    this.showHousehold=true;
  }

}
