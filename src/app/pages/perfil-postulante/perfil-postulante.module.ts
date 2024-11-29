import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPostulantePageRoutingModule } from './perfil-postulante-routing.module';

import { PerfilPostulantePage } from './perfil-postulante.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPostulantePageRoutingModule,
    SharedModule
  ],
  declarations: [PerfilPostulantePage]
})
export class PerfilPostulantePageModule {}
