import { Component, OnInit } from '@angular/core';
import { fromEventPattern } from 'rxjs';
import { MediaService } from '../../../services/media.service';
import { UploadResponse } from '../../models/upload-response';


@Component({
  selector: 'app-media-upload',
  templateUrl: './media-upload.component.html',
  styleUrls: ['./media-upload.component.css']
})
export class MediaUploadComponent implements OnInit {

  constructor(private mediaService:MediaService) { }

  ngOnInit(): void {
  }

  upload:UploadResponse = new UploadResponse();
  isActive:boolean;
  

  onDragOver(event:any){
    event.preventDefault();
    event.stopPropagation();
    this.isActive = true;
    console.log('Drag over');
  }

  onDragLeave(event:any){
    event.preventDefault();
    event.stopPropagation();
    this.isActive = false;
    console.log('Drag leave');
  }

  onDrop(event:any){
    event.preventDefault();
    event.stopPropagation();
    console.log('Drop');

    let droppedFiles = event.dataTransfer.files;
    if(droppedFiles.length > 0){
      this.onDroppedFiles(droppedFiles);
    }
    this.isActive = false;
  }

  onSelectFile(event:any){
    if(event.target.files.length > 0){
      this.onDroppedFiles(event.target.files);
    }
  }

  onDroppedFiles(droppedFiles:any){
    let formData = new FormData();
    for(let item of droppedFiles){
      formData.append('mediafiles', item)
    }
    this.mediaService.upload(formData).subscribe(result => {this.upload = result});
  }

}
