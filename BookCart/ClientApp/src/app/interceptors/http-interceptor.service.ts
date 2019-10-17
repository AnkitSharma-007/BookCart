import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, newRequest: HttpHandler): Observable<HttpEvent<any>> {

    const headerToken = localStorage.getItem('authToken');

    if (headerToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${headerToken}`
        }
      });
    }
    return newRequest.handle(request);
  }
}
