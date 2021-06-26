import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ErrorCommunicationService } from '../services/communication/error.communication.service';
import { UserCommunicationService } from '../services/communication/user.communication.service';

@Injectable({
  providedIn: 'root'
})
export class ModoZoneGuard implements CanActivate {

  constructor(
    public userCommunication: UserCommunicationService,
    public errorCommunication: ErrorCommunicationService,
    public router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userCommunication.canAccessModoZone()) {
      return true;
    }

    this.errorCommunication.throwError({ message: 'You don\'t have the right to enter here!' });
    this.router.navigate(['tabs', 'settings']);
    return false;
  }
}