import { Component, OnInit, Inject, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs'
import { ServiceHierarchyComponent } from '../service-hierarchy/service-hierarchy.component';
import { ServiceHierarchyService } from '../../../services/service-hierarchy.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
  selector: 'app-service-hierarchy-edit',
  templateUrl: './service-hierarchy-edit.component.html',
  styleUrls: ['./service-hierarchy-edit.component.css']
})
export class ServiceHierarchyEditComponent implements OnInit {

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

  currentService;

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
