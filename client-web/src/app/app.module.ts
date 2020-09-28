import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing.module';


import { CarouselModule } from 'ngx-owl-carousel-o';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { ServiceDetailsComponent } from './components/service-details/service-details.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { HomeComponent } from './components/home/home.component';

import { HowItWorkVideoComponent } from './components/how-it-work-video/how-it-work-video.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { SidenavComponent } from './admin/components/sidenav/sidenav.component';
import { TopbarComponent } from './admin/components/topbar/topbar.component';
import { ServiceManageComponent } from './admin/components/service-manage/service-manage.component';
import { AdminDefaultComponent } from './admin/components/admin-default/admin-default.component';
import { DefaultComponent } from './components/default/default.component';

@NgModule({
  declarations: [
    AppComponent,
    AddServiceComponent,
    ServiceDetailsComponent,
    ServiceListComponent,
    HomeComponent,
    HowItWorkVideoComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    SidenavComponent,
    TopbarComponent,
    ServiceManageComponent,
    AdminDefaultComponent,
    DefaultComponent
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
  bootstrap: [AppComponent]
})
export class AppModule { }
