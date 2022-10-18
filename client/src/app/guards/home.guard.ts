import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {

  }
  canActivate(): Observable<boolean> | boolean {
    return this.authService.auth("/renew")
      .pipe(
        tap((res) => {
          if (res !== true) { this.router.navigateByUrl("/auth") }
        }),
        map((res) => res === true ? true : false)
      );
  }
  canLoad(): Observable<boolean> | boolean {
    return this.authService.auth("/renew")
      .pipe(
        tap((res) => {
          if (res !== true) { this.router.navigateByUrl("/auth") }
        }),
        map((res) => res === true ? true : false)
      )
  }
}
