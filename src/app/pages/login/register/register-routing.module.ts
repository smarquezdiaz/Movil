import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPage } from './register.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage
  },  {
    path: 'register-company',
    loadChildren: () => import('./register-company/register-company.module').then( m => m.RegisterCompanyPageModule)
  },
  {
    path: 'register-convocatoria',
    loadChildren: () => import('./register-convocatoria/register-convocatoria.module').then( m => m.RegisterConvocatoriaPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPageRoutingModule {}
