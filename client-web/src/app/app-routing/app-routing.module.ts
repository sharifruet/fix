import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ServiceListComponent } from '../components/service-list/service-list.component';
import { ServiceDetailsComponent } from '../components/service-details/service-details.component';
import { AddServiceComponent } from '../components/add-service/add-service.component';

const routes: Routes = [
  { path: '', redirectTo: 'services', pathMatch: 'full' },
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
