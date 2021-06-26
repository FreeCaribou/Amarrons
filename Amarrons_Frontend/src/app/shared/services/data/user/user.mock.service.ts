import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mock_login_admin, mock_login_modo, mock_login_simple } from './user.mock';
import { IUserService } from './user.service.interface';

@Injectable({
  providedIn: 'root'
})
export class UserMockDataService implements IUserService {

  login(user): Observable<any> {
    if (user.email === "samy@amarrons.com") {
      return of(mock_login_admin);
    } else if (user.email === "rluxemburg@amarrons.com") {
      return of(mock_login_modo);
    }
    return of(mock_login_simple);
  }

  signUp(user): Observable<any> {
    return of(mock_login_simple);
  }

  verifyRight(authorizedRoles: string[]): Observable<any> {
    return of({ isAuthorized: true });
  }

  verifyToken(): Observable<any> {
    return of(mock_login_admin);
  }
}