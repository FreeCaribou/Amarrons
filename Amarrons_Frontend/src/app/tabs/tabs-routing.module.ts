import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModoZoneGuard } from '../shared/guards/modo-zone.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'main-map',
        loadChildren: () => import('../modules/main-map/main-map.module').then(m => m.MainMapModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../modules/settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('../modules/admin/admin.module').then(m => m.AdminModule),
        canActivate: [ModoZoneGuard]
      },
      {
        path: '',
        redirectTo: '/tabs/main-map',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/main-map',
    pathMatch: 'full'
  },
  {
    // TODO? an better redirect? with message?
    path: '**',
    redirectTo: '/tabs/main-map',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
