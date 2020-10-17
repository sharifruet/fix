import { Component, OnInit } from '@angular/core';
import { ServiceHierarchyService } from '../../../services/service-hierarchy.service';
import { ServiceHierarchyComponent } from '../service-hierarchy/service-hierarchy.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-service-hierarchy-add',
  templateUrl: './service-hierarchy-add.component.html',
  styleUrls: ['./service-hierarchy-add.component.css']
})
export class ServiceHierarchyAddComponent implements OnInit {

serviceHierarchy = {
    title: '',
	description:'',
	published:'',
	parentId:'',
	hierarchyPath:'',
	serviceLayer:'',
	end:'',
	status:''
	
  };

  constructor(private service: ServiceHierarchyService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
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
	  published:this.serviceHierarchy.published,
	  parentId:this.serviceHierarchy.parentId,
	  hierarchyPath:this.serviceHierarchy.hierarchyPath,
	  serviceLayer:this.serviceHierarchy.serviceLayer,
	  end:this.serviceHierarchy.end,
	  status:this.serviceHierarchy.status
	
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
	  description:'',
	  published:'',
	  parentId:'',
	  hierarchyPath:'',
	  serviceLayer:'',
	  end:'',
	  status:''
	  
    }
  }

}

