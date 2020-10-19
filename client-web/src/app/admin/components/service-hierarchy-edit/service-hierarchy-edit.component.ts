import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs'
import { ServiceHierarchyComponent } from '../service-hierarchy/service-hierarchy.component';
import { ServiceHierarchyService } from '../../../services/service-hierarchy.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-service-hierarchy-edit',
  templateUrl: './service-hierarchy-edit.component.html',
  styleUrls: ['./service-hierarchy-edit.component.css']
})
export class ServiceHierarchyEditComponent implements OnInit {

  currentService;

  serviceHParent: any[] = [];
  filteredOptions: Observable<any[]>;
  myControl = new FormControl;
  
  constructor(private _snackBar: MatSnackBar, private serviceHierarchyService:ServiceHierarchyService, public dialogRef:MatDialogRef<ServiceHierarchyComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any) { 
      this.currentService=data;
     }
  
  ngOnInit(): void {
    this.getAllServiceHierarchy();
  }

  private _filterTour(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.serviceHParent.filter(option => option.title.toLowerCase().includes(filterValue));
  }



  getAllServiceHierarchy(){
     this.serviceHierarchyService.getAll().subscribe(
      data => {
        this.serviceHParent = data;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.title),
          // map(value => this._filterTour(value)),
          map(value => value ? this._filterTour(value) : this.serviceHParent.slice())
        );
      });
 }
 
 displayFn(parent) {
    // return parent ? parent.title : parent;
    return this.serviceHParent.find(item => item.id === parent).title;
}

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

updateService(): void {
    this.serviceHierarchyService.update(this.currentService.id, this.currentService)
      .subscribe(
        response => {
          console.log(response);
          this.openSnackBar('The service updated successfully!');
        },
        error => {
          console.log(error);
        });
  }
/*
  updatePublished(status): void {
    const data = {
      title: this.currentService.title,
      description: this.currentService.description,
      published: status
    };

    this.serviceService.update(this.currentService.id, data)
      .subscribe(
        response => {
          this.currentService.published = status;
          console.log(response);
          this.openSnackBar('The service updated successfully!');
        },
        error => {
          console.log(error);
        });
  }
  */
}
