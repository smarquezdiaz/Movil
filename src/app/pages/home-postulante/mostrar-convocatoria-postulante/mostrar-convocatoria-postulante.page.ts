import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConvocatoriaParaPostulantes } from 'src/app/modelos/convocatoria';
import { ConvocatoriaService } from 'src/app/services/convocatoria.service';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-mostrar-convocatoria-postulante',
  templateUrl: './mostrar-convocatoria-postulante.page.html',
  styleUrls: ['./mostrar-convocatoria-postulante.page.scss'],
})
export class MostrarConvocatoriaPostulantePage implements OnInit {

  idConvocatoria!: number;
  convocatoria!: ConvocatoriaParaPostulantes; 
  imageEmpresa!: any;
  imageConvocatoria!: any;


  constructor(private convocatoriaService: ConvocatoriaService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router,
    private imagenService: ImagenService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idConvocatoria = params['idConvocatoria'];
      console.log(this.idConvocatoria);
    })
    this.convocatoriaService.obtenerConvocatoriaParaPostulante(this.idConvocatoria).subscribe({
      next: (res) => {
        this.convocatoria = res;
        this.obtenerImagenEmpresa(this.convocatoria.empresa.imagen);
        this.obtenerImagenConvocatoria(this.convocatoria.imagen);
      }
    })
  }

  obtenerImagenEmpresa(url: string) {
    this.imagenService.obtenerImagen(url).subscribe({
      next: (res) => {
        let objectURL = URL.createObjectURL(res);
        this.imageEmpresa = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  obtenerImagenConvocatoria(url: string) {
    this.imagenService.obtenerImagen(url).subscribe({
      next: (res) => {
        let objectURL = URL.createObjectURL(res);
        this.imageConvocatoria = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
