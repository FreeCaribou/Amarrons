import { NgModule } from '@angular/core';
import { SettingsRoutingModule } from './settings.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsPage } from './pages/settings.page';
import { LoginComponent } from './components/login/login.component';



@NgModule({
  declarations: [SettingsPage, LoginComponent],
  imports: [
    SettingsRoutingModule,
    SharedModule
  ]
})
export class SettingsModule { }
