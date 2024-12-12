import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostulanteListPage } from './postulante-list.page';

const routes: Routes = [
  {
    path: '',
    component: PostulanteListPage
  },
  {
    path: 'mostrar-postulante/:idConvocatoria/:idPostulante/:estado',
    loadChildren: () => import('../../postulantes/postulante-list/mostrar-postulante/mostrar-postulante.module').then( m => m.MostrarPostulantePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostulanteListPageRoutingModule {}
