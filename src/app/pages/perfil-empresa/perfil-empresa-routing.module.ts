// perfil-empresa-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { PerfilEmpresaPage } from './perfil-empresa.page'; 
=======
import { PerfilEmpresaPage } from './perfil-empresa.page'; // Asegúrate de importar correctamente tu página
>>>>>>> Jhosy

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
