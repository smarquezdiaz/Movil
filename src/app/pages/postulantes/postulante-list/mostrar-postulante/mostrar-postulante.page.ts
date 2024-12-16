import { Component, NgZone, OnInit } from '@angular/core';
import { ModalConfirmacionComponent } from 'src/app//shared/componentes/modal-confirmacion/modal-confirmacion.component';
import { ModalExitoComponent } from 'src/app/shared/componentes/modal-exito/modal-exito.component';
import { ActivatedRoute } from '@angular/router';
import { User, UserConvocatoria } from 'src/app/modelos/user';
import { PostulanteService } from 'src/app/services/postulante.service';
import { ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';
import { ConvocatoriaService } from 'src/app/services/convocatoria.service';
import { PostulanteDto } from 'src/app/modelos/postulante';
import { ImagenService } from 'src/app/services/imagen.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Directory, Filesystem } from '@capacitor/filesystem';



@Component({
  selector: 'app-mostrar-postulante',
  templateUrl: './mostrar-postulante.page.html',
  styleUrls: ['./mostrar-postulante.page.scss'],
})
export class MostrarPostulantePage implements OnInit {

  idConvocatoria!: number;  
  idPostulante!: number;  
  postulante!: PostulanteDto;
  isPostulating: boolean = false;
  estado!: string;
  etapa!: string;
  pdfSrc!: any;
  progress = 0;
  downloading = false;

  constructor(
    private route: ActivatedRoute,
    private postulanteService: PostulanteService,
    private formBuilder: FormBuilder, 
    private modalController: ModalController,
    private emailService: EmailService,
    private convocatoriaService: ConvocatoriaService,
    private imagenService: ImagenService,
    private sanitizer: DomSanitizer,
    ngZone: NgZone
  ) { 
    Filesystem.addListener('progress', (progressStatus) => {
      ngZone.run(() => {
        const percentage = progressStatus.bytes / progressStatus.contentLength;
        console.log(percentage);
        this.progress = percentage;
      });
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idConvocatoria = params['idConvocatoria'];
      this.idPostulante = params['idPostulante'];
      console.log('ID Convocatoria:', this.idConvocatoria);
      console.log('ID Postulante:', this.idPostulante);
      this.estado = params['estado'];
      this.etapa = params['etapa'];
      console.log('estado:', this.estado);
      this.obtenerPostulante();
    });
  }


  obtenerPostulante() {
    this.postulanteService.obtenerPostulantePorConvocatoria(this.idConvocatoria, this.idPostulante).subscribe({
      next: (res) => {
        this.postulante = res;
        console.log('Postulante encontrado:', this.postulante);
        this.imagenService.obtenerPdf(this.postulante.datosAdicionales.curriculum).subscribe({
          next: (res) => {
            let objectURL = URL.createObjectURL(res);
            this.pdfSrc = objectURL;
            console.log(this.pdfSrc);
          },
          error: (err) => {
            console.error('Error al obtener el PDF', err);
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener postulante:', err);
      }
    });
  }



  cambiarEstado(status: string) {
    this.isPostulating = true;
    this.convocatoriaService.obtenerConvocatoria(this.idConvocatoria).subscribe({
      next: (res) => {
        const email = {
          destinatario: this.postulante.correo,
          idPostulante: this.postulante.id,
          idConvocatoria: this.idConvocatoria,
          tituloConvocatoria: res.titulo,
          estadoPostulante: status,
        }
        this.emailService.sendEmail(email).subscribe({
          next: (res) => {
            this.showSuccessModal(); 
            this.isPostulating = false;
          },
          error: (err) => {
            this.isPostulating = false;
            console.error('Error al cambiar estado:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error al cambiar estado:', err);
      }
    });

  }

  async showSuccessModal() {
    const modal = await this.modalController.create({
      component: ModalExitoComponent,
      componentProps: {
        ruta: '/home'  
      }
    });
    await modal.present();
  }

  async download() {
    const url = this.pdfSrc;
    this.downloading = true;
    const { path } = await Filesystem.downloadFile({ directory: Directory.Cache, path: 'mypdf.pdf', url, progress: true });
    if (!path) {
      throw new Error(`Unable to download ${url}`);
    }
    this.downloading = false;
  }
}
