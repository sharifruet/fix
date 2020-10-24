import { Component, OnInit, HostListener } from '@angular/core';
import { LoginSignupComponent } from '../login-signup/login-signup.component';
import { MatDialog } from '@angular/material/dialog';
import { ServiceHierarchyService } from '../../services/service-hierarchy.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog, private servicehierarchy:ServiceHierarchyService) { }

  ngOnInit(): void {
    this.getServiceHierarchyParent();
  }
  serviceHLayer1;
  serviceHLayer2;
  serviceHLayer3;


  getServiceHierarchyParent(){
    this.servicehierarchy.getAll().subscribe(serviceHLayer1=>this.serviceHLayer1=serviceHLayer1.filter((serviceH) => serviceH.parentId == -1));
  }
  
  hLayer1(id){
    this.servicehierarchy.getAll().subscribe(serviceHLayer2=>this.serviceHLayer2=serviceHLayer2.filter((serviceC) => serviceC.parentId == id));
  }

  hLayer2(id){
    this.servicehierarchy.getAll().subscribe(serviceHLayer3=>this.serviceHLayer3=serviceHLayer3.filter((serviceCC) => serviceCC.parentId == id));
  }

  isSticky: boolean = false;

  @HostListener('window:scroll')
  checkScroll() {
    this.isSticky = window.pageYOffset >= 64;
  }

  openLogin(){
    const dialogRef = this.dialog.open(LoginSignupComponent, {
      width:'500px'
    });
  }

  

}
