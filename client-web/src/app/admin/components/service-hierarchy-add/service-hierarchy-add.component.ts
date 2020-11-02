import { Component, OnInit, Input, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs'
import { ServiceHierarchyService } from '../../../services/service-hierarchy.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularEditorConfig } from '@kolkov/angular-editor';




@Component({
  selector: 'app-service-hierarchy-add',
  templateUrl: './service-hierarchy-add.component.html',
  styleUrls: ['./service-hierarchy-add.component.css']
})
export class ServiceHierarchyAddComponent implements OnInit {

  @ViewChild('viewContainer', {read: ViewContainerRef}) viewContainer: ViewContainerRef;
  @ViewChild('template') template: TemplateRef<any>;

  insertView() {
    const template = this.template.createEmbeddedView(null);
    this.viewContainer.insert(template);
  }

  editorConfig: AngularEditorConfig = {
      editable: true,
      spellcheck: true,
      minHeight: '60px',
      placeholder: 'Enter text here...',
      defaultFontName: '',
      defaultFontSize: '',
      toolbarPosition: 'top',
      toolbarHiddenButtons: [
        ['fontSize'],['undo','redo','subscript',
        'superscript','justifyLeft','justifyCenter','justifyRight','justifyFull','indent','outdent','fontName'],
        ['fontSize','textColor', 'backgroundColor','customClasses','link',
          'unlink',
          'insertImage',
          'insertVideo',
          'insertHorizontalRule',
          'removeFormat',
          'toggleEditorMode'
        ]
      ]
};

  serviceHierarchy = {
    title: '',
    description: '',
    published: true,
    parentId: '',
    hierarchyPath: '',
    serviceLayer: '',
    overview:'',
    detail:'',
    faq:'',
    end: '',
    price:'',
    status: ''
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

  serviceLayer=false;
  isServiceLayer(event){
    console.log(event);
    if(event.checked == true){
      this.serviceLayer= true;
    }else{
      this.serviceLayer = false;
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
    // console.log(this.service);
    const data = {
      title: this.serviceHierarchy.title,
      description: this.serviceHierarchy.description,
      published: this.serviceHierarchy.published,
      parentId: this.serviceHierarchy.parentId,
      hierarchyPath: this.serviceHierarchy.hierarchyPath,
      serviceLayer: this.serviceHierarchy.serviceLayer,
      overview: this.serviceHierarchy.overview,
      detail: this.serviceHierarchy.detail,
      faq: this.serviceHierarchy.faq,
      end: this.serviceHierarchy.end,
      price: this.serviceHierarchy.price,
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
      published: true,
      parentId: '',
      hierarchyPath: '',
      serviceLayer: '',
      overview:'',
      detail:'',
      faq:'',
      end: '',
      price: '',
      status: ''
    }
  }

}

