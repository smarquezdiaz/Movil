import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePostulantePageRoutingModule } from './home-postulante-routing.module';

import { HomePostulantePage } from './home-postulante.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePostulantePageRoutingModule,
    SharedModule,
    FlexLayoutModule
  ],
  declarations: [HomePostulantePage]
})
export class HomePostulantePageModule {}
