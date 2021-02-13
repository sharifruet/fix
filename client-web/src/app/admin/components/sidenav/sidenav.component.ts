import { Component, OnInit } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree'

const TREE_DATA = [ 
  {
    name: 'Dashboard',
    icon:'dashboard',
    link:'/admin/dashboard'
  },
  {
    name: 'Media',
    icon:'perm_media',
    children: [
      {name: 'Add New', link:'/admin/media-upload'},
      {name: 'All Media', link:'/admin/media'},
    ]
  },
  {
    name: 'Services',
    icon:'assignment',
    children: [
      {name: 'Service Manage', link:'/admin/service-manage'},
      {name: 'Area Hierarchy', link:'/admin/area-hierarchy'},
	  {name: 'Service Hierarchy', link:'/admin/service-hierarchy'},
    ]
  },
  {
    name: 'Orders',
    icon:'how_to_vote',
    children: [
      {name: 'Order', link:'/admin/orders'},
      {name: 'Order Items', link:'/admin/order-item'},
      {name: 'Order Item Payment', link:'/admin/order-item-payment'},
    ]
  },
  {
    name: 'Users',
    icon:'group',
    children: [
      {name: 'Manage Users', link:'/admin/users-manage'},
      {name: 'Manage Roles', link:'/admin/roles'},
    ]
  },
  {
    name: 'Settings',
    icon:'settings_applications',
    link:'/admin/settings'
  }
];

interface SideNavItem {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  private _transformer = (node, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      icon:node.icon,
      link:node.link,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<SideNavItem>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: SideNavItem) => node.expandable;

  ngOnInit(): void {
  }

  

}
