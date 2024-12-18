import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Convocatoria, ConvocatoriaParaMostrar } from 'src/app/modelos/convocatoria';
import { ConvocatoriaService } from 'src/app/services/convocatoria.service';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-mostrar-convocatoria',
  templateUrl: './mostrar-convocatoria.page.html',
  styleUrls: ['./mostrar-convocatoria.page.scss'],
})
export class MostrarConvocatoriaPage implements OnInit {

  id!: number;
  convocatoria!: ConvocatoriaParaMostrar;
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
      console.log(this.id);
    })
    this.convocatoriaService.obtenerConvocatoria(this.id).subscribe({
      next: (res) => {
        this.convocatoria = res;
        this.convocatoria.fechaFin = this.formatearFecha( this.convocatoria.fechaFin);
        this.convocatoria.fechaInicio = this.formatearFecha( this.convocatoria.fechaInicio);
        console.log(this.convocatoria);
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
    this.router.navigate(['/postulantes', this.convocatoria.id]);
  }
}
