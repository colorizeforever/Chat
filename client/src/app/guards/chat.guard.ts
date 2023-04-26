import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { getToken } from '../utils/tokenHelper';

@Injectable({
  providedIn: 'root'
})
export class ChatGuard implements CanLoad {
  constructor(
    private readonly router: Router
  ) {
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!getToken()) {
      this.router.createUrlTree(['/auth/signin']);
    }
    return !!getToken();
  }

}
