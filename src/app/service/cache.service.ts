import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  request: any = {}

  constructor() { }

  cacheRequest(requestUrl: string,response: HttpResponse<any>) {
    this.request[requestUrl] = response;
  }

  getCache(requestUrl: string): HttpResponse<any> | null {
    return this.request[requestUrl]
  }

  invalidateCache(requestUrl: string) {
    this.request[requestUrl] = null
  }

  clearCache() {
    this.request = {}
  }
}
