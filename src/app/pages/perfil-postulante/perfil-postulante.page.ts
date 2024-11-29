import { Component, OnInit } from '@angular/core';
import { PostulanteService } from 'src/app/services/postulante.service';
import { UtilsService } from 'src/app/services/utils.service';  // Asegúrate de importar el servicio
import { Postulante } from 'src/app/modelos/postulante';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-perfil-postulante',
  templateUrl: './perfil-postulante.page.html',
  styleUrls: ['./perfil-postulante.page.scss'],
})
export class PerfilPostulantePage implements OnInit {

  postulante!: Postulante; 
  idPostulante!: number; 

  constructor(
    private postulanteService: PostulanteService,
    private utilsService: UtilsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.idPostulante = this.utilsService.getFromLocalStorage('userId');
    if (this.idPostulante) {
      this.getPostulanteData(this.idPostulante);
    } else {
      console.log("No se encontró el id del postulante");
    }
  }

  navigateTo(page: string): void {
    this.router.navigate([`/${page}`]);
  }

  getPostulanteData(idPostulante: number): void {
    this.postulanteService.obtenerPostulantePorId(idPostulante).subscribe(
      (data: Postulante) => {
        this.postulante = data;  
      },
      (error) => {
        console.error('Error al obtener datos del postulante', error);
      }
    );
  }

  actualizarPostulante(): void {
    this.postulanteService.actualizarPostulante(this.idPostulante, this.postulante).subscribe(
      (data: Postulante) => {
        console.log('Datos actualizados con éxito', data);
      },
      (error) => {
        console.error('Error al actualizar datos del postulante', error);
        if (error.status === 0) {
          console.error('El servidor no está disponible');
        } else {
          console.error(`Error HTTP: ${error.status} - ${error.statusText}`);
        }
      }
    );
  }
}
