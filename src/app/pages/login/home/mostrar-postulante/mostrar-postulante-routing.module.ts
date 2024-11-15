import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarPostulantePage } from './mostrar-postulante.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarPostulantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarPostulantePageRoutingModule {}
