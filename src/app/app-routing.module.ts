import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/login/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'postulantes',
    loadChildren: () => import('./pages/postulantes/postulantes.module').then(m => m.PostulantesPageModule)
  },
{
    path: 'perfil-empresa/:id',
    loadChildren: () => import('./pages/perfil-empresa/perfil-empresa.module').then(m => m.PerfilEmpresaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
