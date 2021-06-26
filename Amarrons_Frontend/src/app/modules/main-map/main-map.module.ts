import { NgModule } from '@angular/core';
import { MainMapRoutingModule } from './main-map.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainMapShowComponent } from './components/main-map-show/main-map-show.component';
import { MainMapPage } from './pages/main-map/main-map.page';
import { ManageMapPage } from './pages/manage-map/manage-map.page';

@NgModule({
  declarations: [MainMapShowComponent, MainMapPage, ManageMapPage],
  imports: [
    MainMapRoutingModule,
    SharedModule
  ]
})
export class MainMapModule { }
