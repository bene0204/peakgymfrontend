import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map, Observable} from "rxjs";
import {AuthService} from "./AuthService";
import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class LoginGuard implements CanActivate{

  constructor(private authService: AuthService) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(map((user) => {
      return !!(user);
    }))

  }

}
