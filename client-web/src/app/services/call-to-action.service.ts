import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallToActionService {

  constructor() { }

  private subject = new Subject<any>();

  sendAction(){
    this.subject.next();
  }

  getAction():Observable<any>{
    return this.subject.asObservable();
  }


}
