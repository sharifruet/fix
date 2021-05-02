import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SlidersComponent } from '../sliders/sliders.component';
import { MediaPopupComponent } from '../../components/media-popup/media-popup.component';
import { MediaService } from '../../../services/media.service';
import { SlidersService } from '../../../services/sliders.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-slider-edit',
  templateUrl: './slider-edit.component.html',
  styleUrls: ['./slider-edit.component.css']
})
export class SliderEditComponent implements OnInit {

  currentSlider;
  selectedImage:string;

  constructor(private _snackBar: MatSnackBar, private slidersService:SlidersService, private mediaService:MediaService, private dialog:MatDialog, public dialogRef:MatDialogRef<SlidersComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any) {
      this.currentSlider = data;
    }

  ngOnInit(): void {
    this.getImage(this.currentSlider.photo);
  }

  // open snackbar
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

  // get slider image 
  getImage(id){
    this.mediaService.get(id).subscribe(
      data => {
        this.selectedImage = this.mediaService.mediaPath+data.data.name;
      },
      error => {
        console.log(error);
      }
    );
  }
  

  // add new image for slider update
  addImage(){
    const dialogRef = this.dialog.open(MediaPopupComponent, {
      width:'600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        this.selectedImage = this.mediaService.mediaPath+result.name;
        this.currentSlider.photo = result.id;
      }
    });
  }

  // update slider
  updateSlider():void{
    this.slidersService.update(this.currentSlider.id, this.currentSlider)
    .subscribe(
      response => {
        console.log(response);
        this.openSnackBar('The slide updated successfully');
      },
      error => {
        console.log(error);
      }
    )
  }


  


  





}
