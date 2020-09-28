import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ServiceListComponent } from '../components/service-list/service-list.component';
import { ServiceDetailsComponent } from '../components/service-details/service-details.component';
import { AddServiceComponent } from '../components/add-service/add-service.component';

import { DefaultComponent } from '../components/default/default.component';
import { HomeComponent } from '../components/home/home.component';

import { AdminDefaultComponent } from '../admin/components/admin-default/admin-default.component';
import { DashboardComponent } from '../admin/components/dashboard/dashboard.component';
import { ServiceManageComponent } from '../admin/components/service-manage/service-manage.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path :'home', component:DefaultComponent, children:[
    {
      path:'',
      component:HomeComponent
    }
  ]},
  { path: 'services', component: ServiceListComponent },
  { path: 'service/:id', component: ServiceDetailsComponent },
  { path: 'service', component: AddServiceComponent },

  
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
      path:'service-list',
      component:ServiceListComponent
    }
  ] },
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
