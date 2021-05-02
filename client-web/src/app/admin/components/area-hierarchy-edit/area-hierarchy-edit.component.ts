import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AreaHierarchyComponent } from '../area-hierarchy/area-hierarchy.component';
import { AreaHierarchyService } from '../../../services/area-hierarchy.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs'


@Component({
  selector: 'app-area-hierarchy-edit',
  templateUrl: './area-hierarchy-edit.component.html',
  styleUrls: ['./area-hierarchy-edit.component.css']
})
export class AreaHierarchyEditComponent implements OnInit {

  currentArea;
  areaHParent: any[] = [];
  filteredOptions: Observable<any[]>;
  myControl = new FormControl;

  constructor(private _snackBar: MatSnackBar, private areaService: AreaHierarchyService, public dialogRef: MatDialogRef<AreaHierarchyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentArea = data;
  }

  ngOnInit(): void {
    this.getAllAreaHierarchy();
  }

  private _filterTour(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.areaHParent.filter(option => option.title.toLowerCase().includes(filterValue));
  }
  
  getAllAreaHierarchy() {
    this.areaService.getAll().subscribe(
      data => {
        this.areaHParent = data;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.title),
          map(value => value ? this._filterTour(value) : this.areaHParent.slice())
        );
      });
  }

  displayFn(parent) {
    return this.areaHParent.find(item => item.id === parent).title;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

  updateArea(): void {
    this.areaService.update(this.currentArea.id, this.currentArea)
      .subscribe(
        response => {
          console.log(response);
          this.openSnackBar('The service updated successfully!');
        },
        error => {
          console.log(error);
        });
  }

}