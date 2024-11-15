import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'mostrar-convocatoria',
    loadChildren: () => import('./mostrar-convocatoria/mostrar-convocatoria.module').then( m => m.MostrarConvocatoriaPageModule)
  },
  {
    path: 'mostrar-convocatoria/:id',
    loadChildren: () => import('./mostrar-convocatoria/mostrar-convocatoria.module').then( m => m.MostrarConvocatoriaPageModule)
  },
  {
    path: 'mostrar-postulante/:idConvocatoria/:idPostulante',
    loadChildren: () => import('./mostrar-postulante/mostrar-postulante.module').then( m => m.MostrarPostulantePageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}