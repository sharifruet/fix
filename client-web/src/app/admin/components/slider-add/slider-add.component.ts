import { Component, OnInit } from '@angular/core';
import { MediaPopupComponent } from '../media-popup/media-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { SlidersService } from '../../../services/sliders.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaService } from '../../../services/media.service';

@Component({
  selector: 'app-slider-add',
  templateUrl: './slider-add.component.html',
  styleUrls: ['./slider-add.component.css']
})
export class SliderAddComponent implements OnInit {

  constructor(private mediaService:MediaService, private dialog:MatDialog, private sliderService:SlidersService, private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }

  
  slider = {
    title: '',
    photo:'',
    published: true
  };

  openSnackBar(message:string){
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

  selectedImage;
  addImage(){
    const dialogRef = this.dialog.open(MediaPopupComponent, {
      width:'600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        this.selectedImage = this.mediaService.mediaPath+result.name;
        this.slider.photo = result.id;
      }
    });
  }

  // create a slider
  createSlider(){
    const data = {
      title: this.slider.title,
      photo: this.slider.photo,
      published: this.slider.published
    }
    this.sliderService.create(data)
    .subscribe(
      response => {
        console.log(response);
        this.openSnackBar('The slider added successfully');
        this.newslider();
      },
      error => {
        console.log(error);
      }
    )

  }

  // empty a slider form
  newslider():void{
    this.selectedImage = '';
    this.slider = {
      title: '',
      photo: '',
      published: true
    }
  }


}
