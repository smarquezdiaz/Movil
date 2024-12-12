import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Convocatoria, ConvocatoriaForTableDTO, ConvocatoriaParaMostrar } from 'src/app/modelos/convocatoria';
import { AlertController } from '@ionic/angular';
import { ConvocatoriaService } from 'src/app/services/convocatoria.service';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-mostrar-convocatoria',
  templateUrl: './mostrar-convocatoria.page.html',
  styleUrls: ['./mostrar-convocatoria.page.scss'],
})
export class MostrarConvocatoriaPage implements OnInit {

  id!: number;
  estado!: string;
  convocatoria!: ConvocatoriaForTableDTO;
  image!: any;

  constructor(private route: ActivatedRoute,
    private convocatoriaService: ConvocatoriaService,
    private imagenService: ImagenService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.estado = params['estado'];
    })
    this.convocatoriaService.obtenerConvocatoria(this.id).subscribe({
      next: (res) => {
        this.convocatoria = res;
        this.convocatoria.fechaInicioReclutamiento = this.formatearFecha( this.convocatoria.fechaInicioReclutamiento);
        this.convocatoria.fechaFinReclutamiento = this.formatearFecha( this.convocatoria.fechaFinReclutamiento);
        this.convocatoria.fechaInicioSeleccion = this.formatearFecha( this.convocatoria.fechaInicioSeleccion);
        this.convocatoria.fechaFinSeleccion = this.formatearFecha( this.convocatoria.fechaFinSeleccion);
        this.obtenerImagen(this.convocatoria.imagen);
      },
      error: (error) => {
        console.log(error);
      }
    })
    
  }

  obtenerImagen (url: string) {
    this.imagenService.obtenerImagen(url).subscribe({
      next: (res) => {
        let objectURL = URL.createObjectURL(res);
        this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: async (error) => {
        const alert = await this.alertController.create({
          header: 'Error',
          subHeader: 'Error al subir imagen',
          message: 'Debe subir un archivo menos pesado.',
          buttons: ['ok'],
        });
        await alert.present();
        console.log(error);
      }
    })
  }

  formatearFecha (fecha: string) : string{
    let date = new Date(fecha);
    const format = 'dd/MM/yyyy';
    const formattedDate = formatDate(date.toISOString().split('T')[0], format,'en-US');
    return formattedDate;
  }

  verPostulantes(){
    console.log(this.convocatoria.id);
    this.router.navigate(['/postulantes', this.convocatoria.id, this.estado]);
  }
}
