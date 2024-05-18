import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Server } from '../constant/server';
import { AccountService } from '../service/account.service';
import { CacheService } from '../service/cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constant: Server = new Server();
  host: string = this.constant.host;

  constructor(private accountService:AccountService,private cacheService: CacheService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (request.method !== 'GET'){
      this.cacheService.clearCache();
      return next.handle(request);
    }

    if (request.url.includes(`${this.accountService.host}/user/resetPassword`)){
      return next.handle(request);
    }
    if (request.url.includes(`${this.accountService.host}/user/register`)){
      return next.handle(request);
    }
    if (request.url.includes(`${this.accountService.host}/user/login`)){
      return next.handle(request);
    }
    if (request.url.includes(`${this.accountService.host}/user/findByUsername`)){
      return next.handle(request);
    }

    const cachedResponse: any = this.cacheService.getCache(request.url);

    if (cachedResponse) {
      return of (cachedResponse)
    }

    return next.handle(request).pipe(tap(event => {
      if(event instanceof HttpResponse) {
        this.cacheService.cacheRequest(request.url,event)
      }
    }))
  }
}
