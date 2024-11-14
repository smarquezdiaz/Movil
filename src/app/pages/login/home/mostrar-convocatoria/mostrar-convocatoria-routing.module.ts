import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarConvocatoriaPage } from './mostrar-convocatoria.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarConvocatoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarConvocatoriaPageRoutingModule {}
