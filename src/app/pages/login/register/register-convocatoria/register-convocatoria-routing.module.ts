import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterConvocatoriaPage } from './register-convocatoria.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterConvocatoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterConvocatoriaPageRoutingModule {}
