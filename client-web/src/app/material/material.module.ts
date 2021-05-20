import { NgModule } from '@angular/core';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatTreeModule} from '@angular/material/tree';
import {MatCardModule} from '@angular/material/card'; 
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRippleModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select'; 
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRadioModule} from '@angular/material/radio'; 
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';

const Material = [
  MatMenuModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatBadgeModule,
  MatSidenavModule,
  MatDialogModule,
  MatListModule,
  MatTreeModule,
  MatCardModule,
  MatTableModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
  MatTabsModule,
  MatRippleModule,
  MatTooltipModule,
  MatSelectModule,
  MatSnackBarModule,
  MatExpansionModule, 
  MatProgressBarModule,
  MatSlideToggleModule,
  MatAutocompleteModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
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