import { Component, OnInit } from '@angular/core';
import { AreahierarchyService } from '../../services/areahierarchy.service';

@Component({
  selector: 'app-areahierarchy',
  templateUrl: './areahierarchy.component.html',
  styleUrls: ['./areahierarchy.component.css']
})

  export class AreahierarchyComponent implements OnInit {

    areahirarchy = {
      title: '',
      areaType: '',
      parentId: '',
      hierarchyPath: '',
      status: '',
      published: false
    };
    submitted = false;
  
    constructor(private Areahirarchy: AreahierarchyService) { }
  
    ngOnInit(): void {
    }
  
    saveAreaHierarchy(): void {
      const data = {
        title: this.areahirarchy.title,
        areaType: this.areahirarchy.areaType,
        parentId: this.areahirarchy.parentId,
        hierarchyPath: this.areahirarchy.hierarchyPath,
        status: this.areahirarchy.status,
      };
  
      this.Areahirarchy.create(data)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
          },
          error => {
            console.log(error);
          }); 
    }
    newAreaHierarchy(): void {
      this.submitted = false;
      this.areahirarchy = {
        title: '',
        areaType: '',
        parentId: '',
        hierarchyPath: '',
        status: '',
        published: false
      };
    }
  
  
  
  }
  