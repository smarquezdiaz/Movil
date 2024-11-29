import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConvocatoriaParaPostulantes } from 'src/app/modelos/convocatoria'; // Ajusta la ruta del modelo
import { PostulanteService } from 'src/app/services/postulante.service';
import { ConvocatoriaService } from  'src/app/services/convocatoria.service';// Asegúrate de importar el servicio
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-convocatorias-postuladas',
  templateUrl: './convocatorias-postuladas.page.html',
  styleUrls: ['./convocatorias-postuladas.page.scss'],
})
export class ConvocatoriasPostuladasPage implements OnInit {

  userId: number | null = null;
  convocatorias: any[] = [];

  constructor(
    private utilsService: UtilsService,
    private convocatoriaService: ConvocatoriaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userId = this.utilsService.getFromLocalStorage('userId');
    console.log("User ID desde localStorage:", this.userId);

    if (this.userId) {
      this.obtenerConvocatorias();
    } else {
      console.error("El ID del postulante no está disponible en localStorage.");
    }
  }

  obtenerConvocatorias() {
    if (this.userId) {
      this.convocatoriaService.obtenerConvocatoriasPorPostulante(this.userId).subscribe({
        next: (convocatorias) => {
          this.convocatorias = convocatorias;
          console.log("Convocatorias obtenidas:", this.convocatorias);
        },
        error: (error) => {
          console.error("Error al obtener convocatorias:", error);
        }
      });
    } else {
      console.error("El ID del postulante no está definido.");
    }
  }


}
