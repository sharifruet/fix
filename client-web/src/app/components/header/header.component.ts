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
  serviceHierarchies:any;
  initalParent:number = 1;
  serviceHLayer1;

  constructor(public dialog: MatDialog, private servicehierarchy:ServiceHierarchyService) { }

  ngOnInit(): void {
    this.getServiceHierarchyParent();
  }

  getServiceHierarchyParent(){
    this.servicehierarchy.getAll().subscribe(data=>{
      this.serviceHierarchies = data;
      this.serviceHLayer1 = this.serviceHierarchies.filter((sh) => sh.parentId == -1);
      this.getChildrenTree(this.initalParent);
    });
  }
  
  getChildren(parentId : number){
    let c = this.serviceHierarchies.filter((sh) => sh.parentId == parentId);
    return c;
  }
  navItem:any;
  getChildrenTree(id : number){
	  let tree = this.getChildren(id);
	  tree.forEach(node=>{
		  node.children = this.getChildren(node.id);
		  node.children.forEach(node1=>{
			  node1.children = this.getChildren(node1.id);
				node1.children.forEach(node2=>{
          node2.children = this.getChildren(node2.id);
          node2.children.forEach(node3=>{
            node3.children = this.getChildren(node3.id);
            node3.children.forEach(node4=>{
              node4.children = this.getChildren(node4.id);
            });
          });
			  });
		  });
	  });
  this.navItem = tree;
  
	 
  console.log(tree);
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
