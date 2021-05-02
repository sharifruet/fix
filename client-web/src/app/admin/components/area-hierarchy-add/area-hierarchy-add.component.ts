import { Component, OnInit } from '@angular/core';
import { AreaHierarchyService } from '../../../services/area-hierarchy.service';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-area-hierarchy-add',
  templateUrl: './area-hierarchy-add.component.html',
  styleUrls: ['./area-hierarchy-add.component.css']
})
export class AreaHierarchyAddComponent implements OnInit {

  areaHierarchy = {
    title: '',
    areaType: '',
    parentId: '',
    hierarchyPath: '',
    status: '',
    end: ''
  };

  serviceHParent: any[] = [];
  filteredOptions: Observable<any[]>;
  myControl = new FormControl;

  constructor(private areaService: AreaHierarchyService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllAreaHierarchy();
  }

  private _filterTour(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.serviceHParent.filter(option => option.title.toLowerCase().includes(filterValue));
  }

  // get all area hierarchy
  getAllAreaHierarchy() {
    this.areaService.getAll().subscribe(
      data => {
        this.serviceHParent = data;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.title),
          map(value => value ? this._filterTour(value) : this.serviceHParent.slice())
        );
      });
  }

  displayFn(parent) {
    return this.serviceHParent.find(item => item.id === parent).title;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

  createArea(): void {
    const data = {
      title: this.areaHierarchy.title,
      areaType: this.areaHierarchy.areaType,
      parentId: this.areaHierarchy.parentId,
      hierarchyPath: this.areaHierarchy.hierarchyPath,
      status: this.areaHierarchy.status,
      end: this.areaHierarchy.end,
    };
    this.areaService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.openSnackBar('The service added successfully!');
          this.newArea();
        },
        error => {
          console.log(error);
        });
  }

  newArea(): void {
    this.areaHierarchy = {
      title: '',
      areaType: '',
      parentId: '',
      hierarchyPath: '',
      status: '',
      end: ''
    }
  }

}

