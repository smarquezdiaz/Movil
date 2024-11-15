import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarPostulantePageRoutingModule } from './mostrar-postulante-routing.module';

import { MostrarPostulantePage } from './mostrar-postulante.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostrarPostulantePageRoutingModule,
    SharedModule,
    FlexLayoutModule
  ],
  declarations: [MostrarPostulantePage]
})
export class MostrarPostulantePageModule {}
