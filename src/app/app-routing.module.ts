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
    path: 'home-postulante',
    loadChildren: () => import('./pages/home-postulante/home-postulante.module').then( m => m.HomePostulantePageModule)
  },
 
  {
    path: 'postulantes',
    loadChildren: () => import('./pages/postulantes/postulantes.module').then(m => m.PostulantesPageModule)
  },

  {
    path: 'perfil-postulante',
    loadChildren: () => import('./pages/perfil-postulante/perfil-postulante.module').then( m => m.PerfilPostulantePageModule)
  },
/* {
    path: 'perfil-empresa/:id',  
    loadChildren: () => import('./pages/perfil-empresa/perfil-empresa.module').then(m => m.PerfilEmpresaPageModule)
  }, */


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
