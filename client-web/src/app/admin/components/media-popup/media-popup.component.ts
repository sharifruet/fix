import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../../services/media.service';
import { ShareService } from '../../../services/share.service'

@Component({
  selector: 'app-media-popup',
  templateUrl: './media-popup.component.html',
  styleUrls: ['./media-popup.component.css']
})
export class MediaPopupComponent implements OnInit {

  selected;
  image;
  constructor(private mediaservice:MediaService, private share:ShareService) { }

  ngOnInit(): void {
    this.retrieveMedia();
  }

  medias;
  retrieveMedia(): void {
    this.mediaservice.getAll()
      .subscribe(
        data => {
          this.medias = data;
        },
        error => {
          console.log(error);
        });
  }

  selectImage(data, i){
    this.selected=i;
    this.image=data;
  }

  selectedImage(){
    // this.share.setData(this.image);
  }

}
