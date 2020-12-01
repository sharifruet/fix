import { Component, OnInit, HostListener } from '@angular/core';
import { LoginSignupComponent } from '../login-signup/login-signup.component';
import { MatDialog } from '@angular/material/dialog';
import { ServiceHierarchyService } from '../../services/service-hierarchy.service';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  serviceHierarchies:any = [];
  initalParent:number = 1;
  topLevelMenu : any;

  constructor(public dialog: MatDialog, private servicehierarchy:ServiceHierarchyService) { }

  ngOnInit(): void {
    this.getServiceHierarchyParent();
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
  
  getChildrenTree(id : number){
	  let tree = this.getChildren(id);
	  tree.forEach(node=>{
		  node.children = this.getChildren(node.id);
		  node.children.forEach(node1=>{
			  node1.children = this.getChildren(node1.id);
				node1.children.forEach(node2=>{
				  node2.children = this.getChildren(node2.id);
			  });
		  });
	  });
	  
	console.log(tree);
	return tree;
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

  openLogin(){
    const dialogRef = this.dialog.open(LoginSignupComponent, {
      width:'500px'
    });
  }
}
