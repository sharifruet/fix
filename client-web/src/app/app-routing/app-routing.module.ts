
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ServiceDetailsComponent } from '../components/service-details/service-details.component';


import { DefaultComponent } from '../components/default/default.component';
import { HomeComponent } from '../components/home/home.component';
import { ServiceCategoryComponent } from '../components/service-category/service-category.component';

import { AdminDefaultComponent } from '../admin/components/admin-default/admin-default.component';
import { DashboardComponent } from '../admin/components/dashboard/dashboard.component';
import { ServiceManageComponent } from '../admin/components/service-manage/service-manage.component';


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
    }
  ]},  
  { path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  { path: 'admin', component:AdminDefaultComponent, children:[
    {
      path:'dashboard',
      component:DashboardComponent
    },
    {
      path:'service-manage',
      component:ServiceManageComponent
    }
  ] },

];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
