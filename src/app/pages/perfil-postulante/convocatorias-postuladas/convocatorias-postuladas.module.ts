import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConvocatoriasPostuladasPageRoutingModule } from './convocatorias-postuladas-routing.module';

import { ConvocatoriasPostuladasPage } from './convocatorias-postuladas.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ConvocatoriasPostuladasPageRoutingModule
  ],
  declarations: [ConvocatoriasPostuladasPage]
})
export class ConvocatoriasPostuladasPageModule {}
