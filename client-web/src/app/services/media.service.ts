import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders} from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MediaService extends BaseService implements OnInit {

  constructor(http:HttpClient ) { 
	  super(http, "/file-upload");
  }
  
  ngOnInit(){
    console.log("Media Init called :)");
  }

  upload(data):Observable<any>{
    return this.http.post(this.apiBaseUrl, data, {
      reportProgress:true,
      observe: 'events'
    }).pipe(map(event => this.getEventMessage(event)))
  }
  
  private getEventMessage(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);
      case HttpEventType.Response:
        return event.body;
      default:
        return `Upload event: ${event.type}.`;
    }
  }

  private fileUploadProgress(event: any) {
    const percentDone = Math.round(100 * event.loaded / event.total);
    return { progress: percentDone, files: [] };
  }
}
