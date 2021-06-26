import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserCommunicationService {
  user: any;

  constructor() { }

  isAdmin() {
    if (this.user && this.user.role) {
      return this.user.role.code === "3";
    }
    return false;
  }

  canAccessModoZone() {
    if (this.user && this.user.role) {
      return this.user.role.code === "2" || this.user.role.code === "3";
    }
    return false;
  }

  isConnected() {
    return this.user;
  }

}