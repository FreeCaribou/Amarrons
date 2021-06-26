import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormCommunicationService } from './services/communication/form.communication.service';
import { TemplateCenterColComponent } from './components/template-center-col/template-center-col.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  providers: [
    FormCommunicationService,
  ],
  declarations: [
    TemplateCenterColComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  exports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,

    TemplateCenterColComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
