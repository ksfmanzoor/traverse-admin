import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!!this.authenticationService.tokenValue) {
      const request = req.clone({
        setHeaders: {
          Authorization: `Token ${this.authenticationService.tokenValue.token}`
        }
      });
      return next.handle(request);
    }
    return next.handle(req);
  }
}
