import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from './../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let baseUrl = environment.apiUrl;
    const token = localStorage.getItem('token');

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    request = request.clone({
      url: `${baseUrl}/${request.url}`
    });

    return next.handle(request);
  }
}
