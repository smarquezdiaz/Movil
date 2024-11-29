import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePostulantePage } from './home-postulante.page';

const routes: Routes = [
  {
    path: '',
    component: HomePostulantePage
  },
  {
    path: 'mostrar-convocatoria-postulante',
    loadChildren: () => import('./mostrar-convocatoria-postulante/mostrar-convocatoria-postulante.module').then( m => m.MostrarConvocatoriaPostulantePageModule)
  },
  {
    path: 'mostrar-convocatoria-postulante/:idConvocatoria',
    loadChildren: () => import('./mostrar-convocatoria-postulante/mostrar-convocatoria-postulante.module').then( m => m.MostrarConvocatoriaPostulantePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePostulantePageRoutingModule {}
