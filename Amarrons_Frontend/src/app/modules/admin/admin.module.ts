import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin.routing';
import { AdminPage } from './pages/admin.page';

@NgModule({
  declarations: [AdminPage],
  imports: [
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
