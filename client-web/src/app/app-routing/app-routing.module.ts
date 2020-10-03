
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from '../components/default/default.component';
import { HomeComponent } from '../components/home/home.component';
import {ServiceCategoryComponent} from '../components/service-category/service-category.component';
import {ServiceCategoriesComponent} from '../components/service-categories/service-categories.component';


import { AdminDefaultComponent } from '../admin/components/admin-default/admin-default.component';
import { AdminLoginComponent } from '../admin/components/admin-login/admin-login.component'
import { DashboardComponent } from '../admin/components/dashboard/dashboard.component';
import { ServiceManageComponent } from '../admin/components/service-manage/service-manage.component';
import { UsersManageComponent } from '../admin/components/users-manage/users-manage.component'; 

import { ServiceHierarchyComponent } from '../admin/components/service-hierarchy/service-hierarchy.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path :'', component:DefaultComponent, children:[
    {
      path:'home',
      component:HomeComponent
    },
    {
      path:'service-category',
      component:ServiceCategoryComponent

    },
    {
      path: 'service-categories',
      component:ServiceCategoriesComponent
    }
  ]},  
  { path: 'admin', redirectTo: 'admin/login', pathMatch: 'full' },
  { path:'admin/login', component:AdminLoginComponent },
  { path: 'admin', component:AdminDefaultComponent, children:[
    {
      path:'dashboard',
      component:DashboardComponent
    },
    {
      path:'service-manage',
      component:ServiceManageComponent
    },
    {
      path:'users-manage',
      component:UsersManageComponent
    },
    {
      path:'service-hierarchy',
      component:ServiceHierarchyComponent
    }
  ] },

];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
