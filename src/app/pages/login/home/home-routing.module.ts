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
    path: 'mostrar-convocatoria/:id/:estado',
    loadChildren: () => import('./mostrar-convocatoria/mostrar-convocatoria.module').then( m => m.MostrarConvocatoriaPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}