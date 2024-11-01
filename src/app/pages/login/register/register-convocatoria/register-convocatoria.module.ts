import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterConvocatoriaPageRoutingModule } from './register-convocatoria-routing.module';

import { RegisterConvocatoriaPage } from './register-convocatoria.page';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterConvocatoriaPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [RegisterConvocatoriaPage]
})
export class RegisterConvocatoriaPageModule {}
