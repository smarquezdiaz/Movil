import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss'],
})
export class BottomMenuComponent implements OnInit {
  constructor(private router: Router) {} 

  ngOnInit() {}

  navigateTo(page: string) {
    this.router.navigate([page]);
  }
}
/*
  recibir del backend datos que indiquen en formato json el id del registro y el tipo postulante/empresa
  al momento de utilizar el tab de perfil validar si el tipo es postulante y/o empresa y enviar al segmento de pagina 
  que se correponda con el perfil.
<<<<<<< HEAD
*/
=======
*/
>>>>>>> master
