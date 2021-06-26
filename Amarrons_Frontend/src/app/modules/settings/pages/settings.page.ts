import { Component } from '@angular/core';
import { LanguageCommunicationService } from 'src/app/shared/services/communication/language.communication.service';
import { UserCommunicationService } from 'src/app/shared/services/communication/user.communication.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
})
export class SettingsPage {

  constructor(
    public languageCommunication: LanguageCommunicationService,
    public userCommunication: UserCommunicationService
  ) { }

  ionViewWillEnter() {
  }

  onDisconnect() {
    this.userCommunication.user = null;
    localStorage.removeItem('user_token');
  }

}
