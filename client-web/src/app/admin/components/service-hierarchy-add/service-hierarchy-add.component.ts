import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs'
import { ServiceHierarchyService } from '../../../services/service-hierarchy.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-service-hierarchy-add',
  templateUrl: './service-hierarchy-add.component.html',
  styleUrls: ['./service-hierarchy-add.component.css']
})
export class ServiceHierarchyAddComponent implements OnInit {

  serviceHierarchy = {
    title: '',
    description: '',
    published: '',
    parentId: '',
    hierarchyPath: '',
    serviceLayer: '',
    end: '',
    status: ''
  };

  serviceHParent: any[] = [];
  filteredOptions: Observable<any[]>;
  myControl = new FormControl;

  constructor(private service: ServiceHierarchyService, private _snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.getAllServiceHierarchy();
  }

  private _filterTour(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.serviceHParent.filter(option => option.title.toLowerCase().includes(filterValue));
  }



  getAllServiceHierarchy(){
     this.service.getAll().subscribe(
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

  save(): void {
    console.log(this.service);
    const data = {
      title: this.serviceHierarchy.title,
      description: this.serviceHierarchy.description,
      published: this.serviceHierarchy.published,
      parentId: this.serviceHierarchy.parentId,
      hierarchyPath: this.serviceHierarchy.hierarchyPath,
      serviceLayer: this.serviceHierarchy.serviceLayer,
      end: this.serviceHierarchy.end,
      status: this.serviceHierarchy.status
    };

    this.service.create(data)
      .subscribe(
        response => {
          console.log("1");
          console.log(response);
          this.openSnackBar('The service added successfully!');
          this.newService();
        },
        error => {
          console.log("2");
          console.log(error);
        });
  }

  newService(): void {
    this.serviceHierarchy = {
      title: '',
      description: '',
      published: '',
      parentId: '',
      hierarchyPath: '',
      serviceLayer: '',
      end: '',
      status: ''

    }
  }

}

