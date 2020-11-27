import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../../services/media.service';

@Component({
  selector: 'app-media-popup',
  templateUrl: './media-popup.component.html',
  styleUrls: ['./media-popup.component.css']
})
export class MediaPopupComponent implements OnInit {

  constructor(private mediaservice:MediaService) { }

  ngOnInit(): void {
    this.retrieveMedia();
  }

  medias;

  retrieveMedia(): void {
    this.mediaservice.getAll()
      .subscribe(
        data => {
          this.medias = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  
  selectImage(data){
    console.log(data);
  }

}
