import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';
import { IUserService } from './user.service.interface';

@Injectable({
  providedIn: 'root'
})
export class UserDataService implements IUserService {
  baseUrl = 'users';

  constructor(public baseService: BaseService) { }

  login(user): Observable<any> {
    return this.baseService.post(`${this.baseUrl}/login`, { email: user.email, password: user.password });
  }

  signUp(user): Observable<any> {
    return this.baseService.post(`${this.baseUrl}/signup`, user);
  }

  verifyRight(authorizedRoles: string[]): Observable<any> {
    return this.baseService.get(`${this.baseUrl}/verifyRight?token=${localStorage.getItem('user_token')}&authorizedRoles=${authorizedRoles.join()}`);
  }

  verifyToken(): Observable<any> {
    return this.baseService.get(`${this.baseUrl}/verifyToken`);
  }
}