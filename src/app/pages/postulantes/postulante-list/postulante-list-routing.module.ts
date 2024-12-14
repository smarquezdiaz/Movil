import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostulanteListPage } from './postulante-list.page';

const routes: Routes = [
  {
    path: '',
    component: PostulanteListPage
  },
  {
<<<<<<< HEAD
    path: 'mostrar-postulante/:idConvocatoria/:idPostulante/:estado',
=======
    path: 'mostrar-postulante/:idConvocatoria/:idPostulante/:estado/:etapa',
>>>>>>> 19f958e0aa95efba11aeddb214ca0fe909043589
    loadChildren: () => import('../../postulantes/postulante-list/mostrar-postulante/mostrar-postulante.module').then( m => m.MostrarPostulantePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostulanteListPageRoutingModule {}
