import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagenService } from 'src/app/services/imagen.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ConvocatoriaService } from  'src/app/services/convocatoria.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-convocatorias-postuladas',
  templateUrl: './convocatorias-postuladas.page.html',
  styleUrls: ['./convocatorias-postuladas.page.scss'],
})
export class ConvocatoriasPostuladasPage implements OnInit {

  userId: number | null = null;
  convocatorias: any[] = [];
  showTable: boolean = false;

  constructor(
    private utilsService: UtilsService,
    private convocatoriaService: ConvocatoriaService,
    private router: Router,
    private imagenService: ImagenService,
    private sanitizer: DomSanitizer,
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
          this.convocatorias.forEach((convocatoria) => {
            const imagenName = convocatoria.convocatoria.imagen;
            console.log(this.convocatorias)
            // this.imagenService.obtenerImagen(imagenName).subscribe({
            //   next: (res) => {
            //     let objectURL = URL.createObjectURL(res);
            //     convocatoria.convocatoria.imagenUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            //   },
            //   error: (error) => {
            //     console.error("Error al cargar la imagen", error);
            //   }
            // });
          });
          this.showTable = true;
        },
      });
    }
  }

}
