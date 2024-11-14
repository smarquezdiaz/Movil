import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarConvocatoriaPageRoutingModule } from './mostrar-convocatoria-routing.module';

import { MostrarConvocatoriaPage } from './mostrar-convocatoria.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostrarConvocatoriaPageRoutingModule,
    SharedModule,
    FlexLayoutModule
  ],
  declarations: [MostrarConvocatoriaPage]
})
export class MostrarConvocatoriaPageModule {}
