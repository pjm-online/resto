import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  constructor(private http: HttpClient) {}

  public get(entityName: string): Observable<any> {
    return this.http.get(`${entityName}`);
  }

  public post(entityName: string, payload: any): Observable<any> {
    return this.http.post(`${entityName}`, payload);
  }

  public fileUpload(entityName: string, payload: any, option: any): Observable<any> {
    return this.http.post(`${entityName}`, payload, option);
  }

  public delete(entityName: string): Observable<any> {
    return this.http.delete(`${entityName}`);
  }
  public deleteWithPayload(entityName: string, payload: any): Observable<any> {
    return this.http.delete(`${entityName}`, { body: payload });
  }

  public deleteWithBody(entityName: string, payload: any): Observable<any> {
    const options = {
      body: payload
    };
    return this.http.delete(`${entityName}`, options);
  }

  public put(entityName: string, payload: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${entityName}`, payload);
  }
}
