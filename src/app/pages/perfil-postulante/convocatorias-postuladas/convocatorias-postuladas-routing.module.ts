import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConvocatoriasPostuladasPage } from './convocatorias-postuladas.page';

const routes: Routes = [
  {
    path: '',
    component: ConvocatoriasPostuladasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConvocatoriasPostuladasPageRoutingModule {}
