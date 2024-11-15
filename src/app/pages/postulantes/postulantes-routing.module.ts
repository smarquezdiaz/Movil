import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: ':id',
    loadChildren: () => import('./postulante-list/postulante-list.module').then( m => m.PostulanteListPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostulantesPageRoutingModule {}
