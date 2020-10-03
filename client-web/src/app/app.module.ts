
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    ServiceHierarchyComponent
  ],
  imports: [
    BrowserModule,
	  FormsModule,
	  AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    CarouselModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[
    HowItWorkVideoComponent, 
    ServiceAddComponent, 
    ServiceDetailComponent,
    ServiceEditComponent,
    LoginSignupComponent
  ]
})
export class AppModule { }

