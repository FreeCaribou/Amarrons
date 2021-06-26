import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDataService } from './user.data.service';
import { IUserService } from './user.service.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService {
  constructor(public service: UserDataService) { }

  login(user): Observable<any> {
    return this.service.login(user);
  }

  signUp(user): Observable<any> {
    return this.service.signUp(user);
  }

  verifyRight(authorizedRoles: string[]): Observable<any> {
    return this.service.verifyRight(authorizedRoles);
  }

  verifyToken(): Observable<any> {
    return this.service.verifyToken();
  }

}