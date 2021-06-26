import { Component } from '@angular/core';
import { UserCommunicationService } from '../shared/services/communication/user.communication.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    public userCommunication: UserCommunicationService
  ) { }

}
