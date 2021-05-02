import { Component, OnInit, Inject, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs'
import { ServiceHierarchyComponent } from '../service-hierarchy/service-hierarchy.component';
import { ServiceHierarchyService } from '../../../services/service-hierarchy.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatDialog } from '@angular/material/dialog';
import { MediaPopupComponent } from '../media-popup/media-popup.component';
import { MediaService } from '../../../services/media.service';


@Component({
  selector: 'app-service-hierarchy-edit',
  templateUrl: './service-hierarchy-edit.component.html',
  styleUrls: ['./service-hierarchy-edit.component.css']
})
export class ServiceHierarchyEditComponent implements OnInit {

  @ViewChild('viewContainer', { read: ViewContainerRef }) viewContainer: ViewContainerRef;
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


  

  serviceHParent: any[] = [];
  filteredOptions: Observable<any[]>;
  myControl = new FormControl;
  currentService;

  constructor(private mediaService: MediaService, private dialog: MatDialog, private _snackBar: MatSnackBar, private serviceHierarchyService: ServiceHierarchyService, public dialogRef: MatDialogRef<ServiceHierarchyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentService = data;
    if(this.currentService.serviceLayer == true){
      this.serviceLayer = true;
    }
    if(this.currentService.end == true){
      this.endLevel = true;
    }
  }

  ngOnInit(): void {
    this.getAllServiceHierarchy();
    this.getImage(this.currentService.photo);
  }

  endLevel = false;
  isEnd(event) {
    if (event.checked == true) {
      this.endLevel = true;
    } else {
      this.endLevel = false;
    }
  }

  serviceLayer = false;
  isServiceLayer(event) {
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

  private _filterTour(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.serviceHParent.filter(option => option.title.toLowerCase().includes(filterValue));
  }

  selectedImage;
  addImage() {
    const dialogRef = this.dialog.open(MediaPopupComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.selectedImage = this.mediaService.mediaPath + result.name;
        this.currentService.photo = result.id;
      }
    });
  }

  // get slider image 
  getImage(id) {
    this.mediaService.get(id).subscribe(
      data => {
        this.selectedImage = this.mediaService.mediaPath + data.data.name;
      },
      error => {
        console.log(error);
      }
    );
  }


  getAllServiceHierarchy() {
    this.serviceHierarchyService.getAll().subscribe(
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
}
