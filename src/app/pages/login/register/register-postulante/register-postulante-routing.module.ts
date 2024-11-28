import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPostulantePage } from './register-postulante.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPostulantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPostulantePageRoutingModule {}
