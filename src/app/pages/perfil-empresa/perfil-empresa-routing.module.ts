// perfil-empresa-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilEmpresaPage } from './perfil-empresa.page'; 

const routes: Routes = [
  {
    path: '',
    component: PerfilEmpresaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilEmpresaRoutingModule {}
