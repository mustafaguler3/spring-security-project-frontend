import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../service/account.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if (request.url.includes(`${this.accountService.host}/user/login`)){
      return next.handle(request);
    }
    if (request.url.includes(`${this.accountService.host}/user/register`)){
      return next.handle(request);
    }

    if (request.url.includes(`${this.accountService.host}/user/resetPassword`)){
      return next.handle(request);
    }

    if (request.url.includes(`https://maps.googleapis.com/`)){
      return next.handle(request);
    }
    this.accountService.loadToken();
    const token = this.accountService.getToken();
    const req = request.clone({setHeaders: {Authorization: token}});

    return next.handle(req)
  }
}
