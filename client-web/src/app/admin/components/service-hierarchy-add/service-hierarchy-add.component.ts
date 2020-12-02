import { Component, OnInit, Input, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ServiceHierarchyService } from '../../../services/service-hierarchy.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MediaPopupComponent } from '../media-popup/media-popup.component';

@Component({
  selector: 'app-service-hierarchy-add',
  templateUrl: './service-hierarchy-add.component.html',
  styleUrls: ['./service-hierarchy-add.component.css']
})
export class ServiceHierarchyAddComponent implements OnInit {

  question = '';
  answer = '';
  faqObj;
  faqs = [];
  addToList() {
    if (this.question == '' || this.answer == '') {
      this.faqs = [];
    }
    else {
      this.faqObj = {
        "question": this.question,
        "answer": this.answer
      }
      this.faqs.push(this.faqObj);
      this.question = '';
      this.answer = '';
    }
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
      ['fontSize'], ['undo', 'redo', 'subscript',
        'superscript', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent', 'fontName'],
      ['fontSize', 'textColor', 'backgroundColor', 'customClasses', 'link',
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
    photo:'',
    published: true,
    parentId: '',
    hierarchyPath: '',
    serviceLayer: '',
    overview: '',
    detail: '',
    faq: '',
    end: false,
    price: '',
    status: ''
  };



  endLevel = false;
  isEnd(event) {
    console.log(event);
    if (event.checked == true) {
      this.endLevel = true;
    } else {
      this.endLevel = false;
    }
  }

  serviceLayer = false;
  isServiceLayer(event) {
    console.log(event);
    if (event.checked == true) {
      this.serviceLayer = true;
    } else {
      this.serviceLayer = false;
    }
  }

  hidden = false;
  on(event) {
    if (event.checked == true) {
      this.hidden = true;
    } else {
      this.hidden = false;
    }
  }

  serviceHParent: any[] = [];
  filteredOptions: Observable<any[]>;
  myControl = new FormControl;

  constructor(private service: ServiceHierarchyService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }
  
  ngOnInit(): void {
    this.getAllServiceHierarchy();
  }
  
  selectedImage;
  addImage(){
    const dialogRef = this.dialog.open(MediaPopupComponent, {
      width:'600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedImage = result;
    });

  }

  private _filterTour(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.serviceHParent.filter(option => option.title.toLowerCase().includes(filterValue));
  }

  displayFn(parent) {
    return this.serviceHParent.find(item => item.id === parent).title;
  }
  
  
  getAllServiceHierarchy() {
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

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

  save(): void {
    const data = {
      title: this.serviceHierarchy.title,
      description: this.serviceHierarchy.description,
      photo: this.serviceHierarchy.photo,
      published: this.serviceHierarchy.published,
      parentId: this.serviceHierarchy.parentId,
      hierarchyPath: this.serviceHierarchy.hierarchyPath,
      serviceLayer: this.serviceHierarchy.serviceLayer,
      overview: this.serviceHierarchy.overview,
      detail: this.serviceHierarchy.detail,
      faq: JSON.stringify(this.faqs),
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
      photo:'',
      published: true,
      parentId: '',
      hierarchyPath: '',
      serviceLayer: '',
      overview: '',
      detail: '',
      faq: '',
      end: false,
      price: '',
      status: ''
    }
    this.faqs = [];
    this.isEnd(false);
    this.isServiceLayer(false);
  }

}

