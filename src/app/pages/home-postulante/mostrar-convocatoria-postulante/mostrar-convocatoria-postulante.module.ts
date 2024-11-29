import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarConvocatoriaPostulantePageRoutingModule } from './mostrar-convocatoria-postulante-routing.module';

import { MostrarConvocatoriaPostulantePage } from './mostrar-convocatoria-postulante.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostrarConvocatoriaPostulantePageRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  declarations: [MostrarConvocatoriaPostulantePage]
})
export class MostrarConvocatoriaPostulantePageModule {}
