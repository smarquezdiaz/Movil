import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostulanteListPage } from './postulante-list.page';

const routes: Routes = [
  {
    path: '',
    component: PostulanteListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostulanteListPageRoutingModule {}
