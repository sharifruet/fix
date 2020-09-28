import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { ServiceDetailsComponent } from './components/service-details/service-details.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { AreahierarchyComponent } from './components/areahierarchy/areahierarchy.component';
import { HomeComponent } from './components/home/home.component';


import { CarouselModule } from 'ngx-owl-carousel-o';
import { HowItWorkVideoComponent } from './components/how-it-work-video/how-it-work-video.component';

import { ServiceHierarchyListComponent } from './components/service-hierarchy-list/service-hierarchy-list.component';
import { ServiceHierarchyDetailsComponent } from './components/service-hierarchy-details/service-hierarchy-details.component';
import { AddServiceHierarchyComponent } from './components/add-service-hierarchy/add-service-hierarchy.component';


@NgModule({
  declarations: [
    AppComponent,
    AddServiceComponent,
    ServiceDetailsComponent,
    ServiceListComponent,
    AreahierarchyComponent,
    HomeComponent,
    HowItWorkVideoComponent,
    ServiceHierarchyListComponent,
    ServiceHierarchyDetailsComponent,
    AddServiceHierarchyComponent
  ],
  imports: [
    BrowserModule,
	  FormsModule,
	  AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
