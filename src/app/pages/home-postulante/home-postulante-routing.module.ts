import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePostulantePage } from './home-postulante.page';

const routes: Routes = [
  {
    path: '',
    component: HomePostulantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePostulantePageRoutingModule {}
