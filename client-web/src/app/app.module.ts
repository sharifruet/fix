
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularEditorModule } from '@kolkov/angular-editor'

import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DefaultComponent } from './components/default/default.component';

import { HomeComponent } from './components/home/home.component';
import { HowItWorkVideoComponent } from './components/how-it-work-video/how-it-work-video.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { ServiceCategoriesComponent } from './components/service-categories/service-categories.component';
import { ServiceCategoryComponent } from './components/service-category/service-category.component';

import { SidenavComponent } from './admin/components/sidenav/sidenav.component';
import { TopbarComponent } from './admin/components/topbar/topbar.component';
import { AdminDefaultComponent } from './admin/components/admin-default/admin-default.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';

import { ServiceAddComponent } from './admin/components/service-add/service-add.component';
import { ServiceManageComponent } from './admin/components/service-manage/service-manage.component';
import { ServiceDetailComponent } from './admin/components/service-detail/service-detail.component';
import { ServiceHierarchyComponent } from './admin/components/service-hierarchy/service-hierarchy.component';
import { ServiceEditComponent } from './admin/components/service-edit/service-edit.component';
import { UsersManageComponent } from './admin/components/users-manage/users-manage.component';
import { AdminLoginComponent } from './admin/components/admin-login/admin-login.component';
import { ServiceComponent } from './components/service/service.component';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { RolesComponent } from './admin/components/roles/roles.component';
import { RoleAddComponent } from './admin/components/roles/role-add/role-add.component';
import { UserAddComponent } from './admin/components/users-manage/user-add/user-add.component';
import { UserEditComponent } from './admin/components/users-manage/user-edit/user-edit.component';
import { UserDetailComponent } from './admin/components/users-manage/user-detail/user-detail.component';
import { AreaHierarchyComponent } from './admin/components/area-hierarchy/area-hierarchy.component';
import { MediaUploadComponent } from './admin/components/media-upload/media-upload.component';

import { RoleEditComponent } from './admin/components/roles/role-edit/role-edit.component';
import { RoleDetailComponent } from './admin/components/roles/role-detail/role-detail.component';
import { ServiceHierarchyAddComponent } from './admin/components/service-hierarchy-add/service-hierarchy-add.component';
import { ServiceHierarchyEditComponent } from './admin/components/service-hierarchy-edit/service-hierarchy-edit.component';
import { ServiceHierarchyDetailComponent } from './admin/components/service-hierarchy-detail/service-hierarchy-detail.component';

import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { AreaHierarchyAddComponent } from './admin/components/area-hierarchy-add/area-hierarchy-add.component';
import { AreaHierarchyEditComponent } from './admin/components/area-hierarchy-edit/area-hierarchy-edit.component';
import { AreaHierarchyDetailComponent } from './admin/components/area-hierarchy-detail/area-hierarchy-detail.component';
import { MenuItemComponent } from './components/header/menu-item/menu-item.component';
import { MediaComponent } from './admin/components/media/media.component';
import { OrdersComponent } from './admin/components/orders/orders.component';
import { OrderItemComponent } from './admin/components/order-item/order-item.component';
import { OrderItemPaymentComponent } from './admin/components/order-item-payment/order-item-payment.component';
import { MediaPopupComponent } from './admin/components/media-popup/media-popup.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HowItWorkVideoComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    SidenavComponent,
    TopbarComponent,
    ServiceManageComponent,
    AdminDefaultComponent,
    DefaultComponent,
    ServiceAddComponent,
    ServiceDetailComponent,
    ServiceCategoriesComponent,
    ServiceCategoryComponent,
    ServiceEditComponent,
    UsersManageComponent,
    AdminLoginComponent,
    LoginSignupComponent,
    ServiceHierarchyComponent,
    ServiceComponent,
    AddToCartComponent,
	  AreaHierarchyComponent,
    RolesComponent,
    RoleAddComponent,
    UserAddComponent,
    UserEditComponent,
    UserDetailComponent,
    MediaUploadComponent,
    RoleEditComponent,
    RoleDetailComponent,
	  ServiceHierarchyAddComponent,
	  ServiceHierarchyEditComponent,
	  ServiceHierarchyDetailComponent,
	  UserProfileComponent,
	  AreaHierarchyAddComponent,
	  AreaHierarchyEditComponent,
	  AreaHierarchyDetailComponent,
	  MenuItemComponent,
    MediaComponent,
    OrdersComponent,
    OrderItemComponent,
    OrderItemPaymentComponent,
    MediaPopupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
	  AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    CarouselModule,
    FlexLayoutModule,
    AngularEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[
    HowItWorkVideoComponent, 
    ServiceAddComponent, 
    ServiceDetailComponent,
    ServiceEditComponent,
    LoginSignupComponent,
    AddToCartComponent,
	  UserAddComponent,
	  RoleAddComponent,
	  UserEditComponent,
	  UserDetailComponent,
	  RoleDetailComponent,
	  RoleEditComponent,
	  RolesComponent,
	  ServiceHierarchyDetailComponent,
	  ServiceHierarchyEditComponent,
	  ServiceHierarchyAddComponent,
	  AreaHierarchyDetailComponent,
	  AreaHierarchyEditComponent,
    AreaHierarchyAddComponent,
    MediaPopupComponent
  ]
})
export class AppModule { }

