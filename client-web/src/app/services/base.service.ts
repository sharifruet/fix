import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api';

export class BaseService {
  apiBaseUrl = '';

  constructor(private http: HttpClient, path:String) {
    this.apiBaseUrl = baseUrl + path;
 }

  getAll(): Observable<any> {
    console.log(this.apiBaseUrl);
    return this.http.get(this.apiBaseUrl);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(this.apiBaseUrl, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${this.apiBaseUrl}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.apiBaseUrl);
  }

  filter(data): Observable<any> {
    return this.http.post(this.apiBaseUrl +"/filter", data);
  }
  
}
