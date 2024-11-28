import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarConvocatoriaPostulantePage } from './mostrar-convocatoria-postulante.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarConvocatoriaPostulantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarConvocatoriaPostulantePageRoutingModule {}
