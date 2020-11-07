import { Component, OnInit } from '@angular/core';
import { AreaHierarchyService } from '../../../services/area-hierarchy.service';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs'
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-area-hierarchy-add',
  templateUrl: './area-hierarchy-add.component.html',
  styleUrls: ['./area-hierarchy-add.component.css']
})
export class AreaHierarchyAddComponent implements OnInit {

areaHierarchy = {
    title: '',
	areaType:'',
	parentId:'',
	hierarchyPath:'',
	status:'',
	end:''

  };

endLevel=false;
  isEnd(event){
    console.log(event);
    if(event.checked == true){
      this.endLevel= true;
    }else{
      this.endLevel = false;
    }
  }

 hidden=false;
  on(event){
    if(event.checked == true){
      this.hidden= true;
    }else{
      this.hidden = false;
    }
  }
 serviceHParent: any[] = [];
  filteredOptions: Observable<any[]>;
  myControl = new FormControl;
  
  constructor(private service: AreaHierarchyService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
	  this.getAllAreaHierarchy();
  }
  
    private _filterTour(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.serviceHParent.filter(option => option.title.toLowerCase().includes(filterValue));
  }
  
  getAllAreaHierarchy(){
     this.service.getAll().subscribe(
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

  save(): void {
    console.log(this.service);
    const data = {
      title: this.areaHierarchy.title,
	  areaType: this.areaHierarchy.areaType,
	  parentId:this.areaHierarchy.parentId,
	  hierarchyPath:this.areaHierarchy.hierarchyPath,
	  status:this.areaHierarchy.status,
	  end: this.areaHierarchy.end,

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
    this.areaHierarchy = {
      title: '',
	  areaType:'',
	  parentId:'',
	  hierarchyPath:'',
	  status:'',
	  end:''

    }
  }

}

