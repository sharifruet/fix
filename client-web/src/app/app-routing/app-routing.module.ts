import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ServiceListComponent } from '../components/service-list/service-list.component';
import { ServiceDetailsComponent } from '../components/service-details/service-details.component';
import { AddServiceComponent } from '../components/add-service/add-service.component';
import { ServiceHierarchyListComponent } from '../components/service-hierarchy-list/service-hierarchy-list.component';
import { ServiceHierarchyDetailsComponent } from '../components/service-hierarchy-details/service-hierarchy-details.component';
import { AddServiceHierarchyComponent } from '../components/add-service-hierarchy/add-service-hierarchy.component';

const routes: Routes = [
  { path: '', redirectTo: 'services', pathMatch: 'full' },
  { path: 'services', component: ServiceListComponent },
  { path: 'service/:id', component: ServiceDetailsComponent },
  { path: 'service', component: AddServiceComponent },
  { path: '', redirectTo: 'serviceHierarchies', pathMatch: 'full' },
  { path: 'serviceHierarchies', component: ServiceHierarchyListComponent },
  { path: 'serviceHierarchy/:id', component: ServiceHierarchyDetailsComponent },
  { path: 'serviceHierarchy', component: AddServiceHierarchyComponent }
    
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
