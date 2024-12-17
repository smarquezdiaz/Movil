import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service'; 

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss'],
})
export class BottomMenuComponent implements OnInit {
  constructor(
    private router: Router,
    private utilsService : UtilsService
  ) {} 

  ngOnInit() {}

  navigateTo(page: string) {
    const rol = localStorage.getItem('rol');
    console.log(rol);
    if (page === 'perfil') {
      if (rol === '"postulante"') {
        this.router.navigate(['/perfil-postulante']);
      } else if (rol === '"empresa"') {
        this.router.navigate(['/perfil-empresa']);
      }
    } else if (page === 'home') {
      if (rol === '"postulante"') {
        this.router.navigate(['/home-postulante']);
      } else if (rol === '"empresa"') {
        this.router.navigate(['/home']);
      }
    }
  }
}