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
  serviceHierarchies;
  initalParent:number = 1;
  serviceHLayer1;
  serviceHLayer2;

  constructor(public dialog: MatDialog, private servicehierarchy:ServiceHierarchyService) { }

  ngOnInit(): void {
    this.getServiceHierarchyParent();
  }

  getServiceHierarchyParent(){
    this.servicehierarchy.getAll().subscribe(data=>{
      this.serviceHierarchies = data;
      this.serviceHLayer1 = this.serviceHierarchies.filter((sh) => sh.parentId == -1);
      this.changeSecondLayer(this.initalParent);
    });
  }

  changeSecondLayer(parentId : number){
    this.initalParent = parentId;
    this.serviceHLayer2 = this.serviceHierarchies.filter((sh) => sh.parentId == this.initalParent);
  }
  
  getChildren(parentId : number){
    let c = this.serviceHierarchies.filter((sh) => sh.parentId == parentId);
    return c;
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
