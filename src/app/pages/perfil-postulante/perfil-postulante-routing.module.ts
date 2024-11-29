import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilPostulantePage } from './perfil-postulante.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilPostulantePage
  },  {
    path: 'convocatorias-postuladas',
    loadChildren: () => import('./convocatorias-postuladas/convocatorias-postuladas.module').then( m => m.ConvocatoriasPostuladasPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilPostulantePageRoutingModule {}
