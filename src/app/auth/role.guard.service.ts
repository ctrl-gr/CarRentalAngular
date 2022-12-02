import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';


@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log('yes,it is admin!',this.authService.checkIsAdmin())
    if (!this.authService.checkIsAdmin()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
