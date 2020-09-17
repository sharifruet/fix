import { NgModule } from '@angular/core';


import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';


const Material = [
  MatMenuModule,
  MatGridListModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatBadgeModule
]

@NgModule({
  imports: [ 
    Material
  ],
  exports: [
    Material
  ]

})

export class MaterialModule {}