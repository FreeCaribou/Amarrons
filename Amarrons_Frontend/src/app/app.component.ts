import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LanguageCommunicationService } from './shared/services/communication/language.communication.service';
import { LoaderCommunicationService } from './shared/services/communication/loader.communication.service';
import { UserCommunicationService } from './shared/services/communication/user.communication.service';
import { UserService } from './shared/services/data/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public languageCommunication: LanguageCommunicationService,
    public loaderCommunication: LoaderCommunicationService,
    public userCommunication: UserCommunicationService,
    public userService: UserService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    console.log('the user platform', this.platform.platforms());

    // TODO better with the token, here it's just to test
    const userToken = localStorage.getItem('user_token');
    if (userToken) {
      const user = await this.userService.verifyToken().toPromise();
      if (user.isValid) {
        this.userCommunication.user = user;
      }
    }

    this.languageCommunication.init();

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
