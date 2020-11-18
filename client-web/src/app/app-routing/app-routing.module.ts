
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from '../components/default/default.component';
import { HomeComponent } from '../components/home/home.component';
import { ServiceCategoryComponent } from '../components/service-category/service-category.component';
import { ServiceComponent } from '../components/service/service.component';
import { ServiceCategoriesComponent } from '../components/service-categories/service-categories.component';

import { AdminDefaultComponent } from '../admin/components/admin-default/admin-default.component';
import { AdminLoginComponent } from '../admin/components/admin-login/admin-login.component'
import { DashboardComponent } from '../admin/components/dashboard/dashboard.component';
import { ServiceManageComponent } from '../admin/components/service-manage/service-manage.component';
import { UsersManageComponent } from '../admin/components/users-manage/users-manage.component'; 
import { RolesComponent } from '../admin/components/roles/roles.component';
import { ServiceHierarchyComponent } from '../admin/components/service-hierarchy/service-hierarchy.component';
import { MediaUploadComponent } from '../admin/components/media-upload/media-upload.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { AreaHierarchyComponent } from '../admin/components/area-hierarchy/area-hierarchy.component';
import { MediaComponent } from '../admin/components/media/media.component';
import { OrdersComponent } from '../admin/components/orders/orders.component';
import { OrderItemComponent } from '../admin/components/order-item/order-item.component';
import { OrderItemPaymentComponent } from '../admin/components/order-item-payment/order-item-payment.component';



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
      path:'service/:id',
      component:ServiceComponent
    },
    {
      path: 'service-categories',
      component:ServiceCategoriesComponent
    },
    {
      path: 'profile',
      component:UserProfileComponent
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
      path:'media',
      component:MediaComponent
    },
    {
      path:'media-upload',
      component:MediaUploadComponent
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
      path:'roles',
      component:RolesComponent
    },
    {
      path:'service-hierarchy',
      component:ServiceHierarchyComponent
    },
	{
      path:'area-hierarchy',
      component:AreaHierarchyComponent
    },
    {
      path:'orders',
      component:OrdersComponent
    },
    {
      path:'order-item',
      component:OrderItemComponent
    },
    {
      path:'order-item-payment',
      component:OrderItemPaymentComponent
    }
  ] },

];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
