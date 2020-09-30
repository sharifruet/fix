import { Component, OnInit } from '@angular/core';
import { ServiceHierarchyService } from '../../services/service-hierarchy.service';

@Component({
  selector: 'app-add-service-hierarchy',
  templateUrl: './add-service-hierarchy.component.html',
  styleUrls: ['./add-service-hierarchy.component.css']
})
export class AddServiceHierarchyComponent implements OnInit {

  service = {
    title: '',
    description: '',
    parentId: '',
    isServiceLayer: '',
    isEnd:'',
    published: false
  };
  submitted = false;

  constructor(private serviceHierarchyService: ServiceHierarchyService) { }

  ngOnInit(): void {
  }

  saveService(): void {
    const data = {
      title: this.service.title,
      description: this.service.description,
      parentId: this.service.parentId,
      isServiceLayer: this.service.isServiceLayer,
      isEnd: this.service.isEnd
    };
    this.serviceHierarchyService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
 
  newService(): void {
    this.submitted = false;
    this.service = {
      title: '',
      description: '',
      parentId: '',
      isServiceLayer:'',
      isEnd:'',
      published: false
    };
  }

}
