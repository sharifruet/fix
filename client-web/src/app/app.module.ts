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
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import { MaterialModule } from './material/material.module';
import { AreahierarchyComponent } from './components/areahierarchy/areahierarchy.component';

@NgModule({
  declarations: [
    AppComponent,
    AddServiceComponent,
    ServiceDetailsComponent,
    ServiceListComponent,
    AreahierarchyComponent
  ],
  imports: [
    BrowserModule,
	  FormsModule,
	  AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatGridListModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
