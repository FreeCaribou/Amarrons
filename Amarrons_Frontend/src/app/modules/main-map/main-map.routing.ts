import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMapPage } from './pages/main-map/main-map.page';
import { ManageMapPage } from './pages/manage-map/manage-map.page';

const routes: Routes = [
  {
    path: '',
    component: MainMapPage,
  },
  {
    path: 'manage-map/:lat/:lng/:zoom/:point',
    component: ManageMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainMapRoutingModule { }
