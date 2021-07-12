import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ServiceHierarchyService } from '../../services/service-hierarchy.service';
import { AreaHierarchyService } from '../../services/area-hierarchy.service';
import { UserServiceService } from '../../services/user-service.service';
import { AuthenticationService } from '../../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface ServiceNode {
  id: number;
  title: string;
  parentId: number;
  children?: ServiceNode[];
}

@Component({
  selector: 'app-elements-popup',
  templateUrl: './elements-popup.component.html',
  styleUrls: ['./elements-popup.component.css']
})
export class ElementsPopupComponent implements OnInit {

  treeControl = new NestedTreeControl<ServiceNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<ServiceNode>();
  dataSource2 = new MatTreeNestedDataSource<ServiceNode>();

  servicesTree: ServiceNode[] = [];
  areasTree: ServiceNode[] = [];
  serviceH = [];
  areaH = [];
  currentUser;

  constructor(
    private services: ServiceHierarchyService, 
    private areas: AreaHierarchyService, 
    private userService: UserServiceService, 
    private authService: AuthenticationService, 
    private _snackBar:MatSnackBar) {
  }

  ngOnInit(): void {
    this.getServices();
    this.getAreas();
    this.currentUser = this.authService.currentUserValue;
  }
  hasChild = (_: number, node: ServiceNode) => !!node.children && node.children.length > 0;

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }


  getServices() {
    this.services.getAll().subscribe(data => {
      this.treedatalist(data, 'services');
      this.dataSource.data = this.servicesTree;
      this.serviceH = data;
    })
  }

  getAreas() {
    this.areas.getAll().subscribe(data => {
      this.treedatalist(data, 'areas');
      this.dataSource2.data = this.areasTree;
      this.areaH = data;
    })
  }


  treedatalist(data, type) {
    if (data.length === 0) {
      return;
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i]["parentId"] == -1) {
        data[i]["children"] = [];
        if (type == 'services') {
          this.servicesTree.push(data[i]);
        } else {
          this.areasTree.push(data[i]);
        }
      }
    }
    if (type == 'services') {
      return this.treedatalistdg(data, this.servicesTree);
    } else {
      return this.treedatalistdg(data, this.areasTree);
    }
  }

  treedatalistdg(data, arraylist) {
    if (arraylist.length === 0) {
      return;
    }
    var j = 0;
    for (j; j < arraylist.length; j++) {
      for (var i = 0; i < data.length; i++) {
        if (data[i]["parentId"] == arraylist[j]["id"]) {
          data[i]["children"] = [];
          arraylist[j]["children"].push(data[i]);
        }
      }
      if (arraylist[j]["children"].length > 0) {
        this.treedatalistdg(data, arraylist[j]["children"]);
      }
    }
  }

  serviceItem;
  areaItems = [];
  areaItem;
  myServices = [];

  myService(id) {
    this.serviceItem = this.serviceH.filter((sh: any) => sh.id == id)[0];
  }
  myArea(event, id) {
    if(event.checked){
      this.areaItems.push(this.areaH.filter((ah: any) => ah.id == id)[0]);
      this.areaItem = this.areaH.filter((ah: any) => ah.id == id)[0];
      this.myServices.push({ userId: 1, serviceId: this.serviceItem.id, areaId: this.areaItem.id });
    }
  }
  
  show = true;
  next() {
    this.show = false;
  }
  previous() {
    this.show = true;
  }

  addMyServices() {
    this.myServices.forEach(item => {
      this.userService.create(item)
      .subscribe(
        response => {
          console.log(response);
          this.openSnackBar('Providing service added');
        },
        error => {
          console.log(error);
        }
      );
    })
  }



}
