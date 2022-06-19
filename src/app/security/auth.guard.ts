import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LocalStorageKey } from '../enum/local-storage-key';
import { UserType } from '../enum/user-type';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private jwt: JwtHelperService, private router: Router, private localStorage: LocalStorageService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.localStorage.getKey(LocalStorageKey.TOKEN)) {
        this.router.navigateByUrl('auth');
        return false;
      }

      if (this.jwt.isTokenExpired()) {
        this.router.navigateByUrl('auth');
        return false;
      }

      const userType = this.jwt.decodeToken().type;
      const path = route.url[0]?.path || '';

      if (userType !== UserType.ADMIN) {
        if (path === 'management') {
          this.router.navigateByUrl('');
          return false;
        }
      }

      if (userType !== UserType.COLABORATOR) {
        if (path === 'colaborator') {
          this.router.navigateByUrl('');
          return false
        };
      }

      if (userType !== UserType.CLIENT) {
        if (path === 'client') {
          this.router.navigateByUrl('');
          return false;
        }

        if (path === 'create') {
          this.router.navigateByUrl('');
          return false
        };
      }

      return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.jwt.isTokenExpired()) {
        return false;
      }
      const userType = this.jwt.decodeToken().type;
      const path = childRoute.url[0]?.path || '';

      if (userType !== UserType.ADMIN) {
        if (path === 'management') {
          this.router.navigateByUrl('');
          return false;
        }
      }

      if (userType !== UserType.COLABORATOR) {
        if (path === 'colaborator') {
          this.router.navigateByUrl('');
          return false
        };
      }

      if (userType !== UserType.CLIENT) {
        if (path === 'client') {
          this.router.navigateByUrl('');
          return false;
        }

        if (path === 'create') {
          this.router.navigateByUrl('');
          return false
        };
      }

      return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.jwt.isTokenExpired()) {
        return false;
      }
      const userType = this.jwt.decodeToken().type;
      console.log(route.path);
      return true;
  }
}
