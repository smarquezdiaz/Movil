import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss'],
})
export class BottomMenuComponent implements OnInit {
  constructor(private router: Router,
    private utilsService : UtilsService
  ) {} 
  rol!:string;
  home!: string;
  ngOnInit() {
    this.rol = this.utilsService.getFromLocalStorage('rol');
    if(this.rol === 'empresa'){this.home = 'home'} else {this.home = 'home-postulante'};
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
  }
}
