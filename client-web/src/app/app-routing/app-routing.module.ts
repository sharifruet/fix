import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ServiceListComponent } from '../components/service-list/service-list.component';
import { ServiceDetailsComponent } from '../components/service-details/service-details.component';
import { AddServiceComponent } from '../components/add-service/add-service.component';
import { HomeComponent } from '../components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path :'home', component:HomeComponent},
  { path: 'services', component: ServiceListComponent },
  { path: 'service/:id', component: ServiceDetailsComponent },
  { path: 'service', component: AddServiceComponent }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
