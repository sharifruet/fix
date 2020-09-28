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
    name: 'Pages',
    icon:'pages',
    children: [
      {name: 'Add New', link:'/admin/service-manage'},
      {name: 'All Pages', link:'/admin/service-list'},
    ]
  },
  {
    name: 'Media',
    icon:'perm_media',
    children: [
      {name: 'Add New', link:'/admin/service-manage'},
      {name: 'All Media', link:'/admin/service-list'},
    ]
  },
  {
    name: 'Menus',
    icon:'menu',
    link:'/admin/dashboard'
  },
  {
    name: 'Services',
    icon:'assignment',
    children: [
      {name: 'Service Manage', link:'/admin/service-manage'},
      {name: 'Service List', link:'/admin/service-list'},
    ]
  },
  {
    name: 'Users',
    icon:'group',
    children: [
      {name: 'Add New', link:'/admin/service-manage'},
      {name: 'All User', link:'/admin/service-list'},
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
