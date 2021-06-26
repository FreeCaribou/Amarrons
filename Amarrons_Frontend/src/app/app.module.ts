import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HttpClientModule,
  HttpClient,
} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { UserDataService } from './shared/services/data/user/user.data.service';
import { UserMockDataService } from './shared/services/data/user/user.mock.service';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { MarkerDataService } from './shared/services/data/marker/marker.data.service';
import { MarkerMockDataService } from './shared/services/data/marker/marker.mock.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, LoaderComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    environment.apiMock ? { provide: UserDataService, useClass: UserMockDataService } : UserDataService,
    environment.apiMock ? { provide: MarkerDataService, useClass: MarkerMockDataService } : MarkerDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
