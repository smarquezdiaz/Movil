import { Component, OnInit } from '@angular/core';
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


@Component({
  selector: 'app-mostrar-postulante',
  templateUrl: './mostrar-postulante.page.html',
  styleUrls: ['./mostrar-postulante.page.scss'],
})
export class MostrarPostulantePage implements OnInit {

  idConvocatoria!: number;  
  idPostulante!: number;  
  postulante!: PostulanteDto;
  userConvocatoria: any = {};
  isPostulating: boolean = false;
  pdfSrc!: any;

  constructor(
    private route: ActivatedRoute,
    private postulanteService: PostulanteService,
    private formBuilder: FormBuilder, 
    private modalController: ModalController,
    private emailService: EmailService,
    private convocatoriaService: ConvocatoriaService,
    private imagenService: ImagenService,
    private sanitizer: DomSanitizer
  ) { 
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idConvocatoria = params['idConvocatoria'];
      this.idPostulante = params['idPostulante'];
      console.log('ID Convocatoria:', this.idConvocatoria);
      console.log('ID Postulante:', this.idPostulante);
      this.obtenerPostulante();
    });

    this.pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

    /* this.imagenService.obtenerPdf('curriculum%20xample.pdf').subscribe({
      next: (res) => {
        console.log(res); 
        let objectURL = URL.createObjectURL(res);
        console.log(objectURL); 
        this.pdfSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: (err) => {
        console.error('Error al obtener el PDF', err);
      }
    }); */
  }


  obtenerPostulante() {
    this.postulanteService.obtenerPostulantePorConvocatoria(this.idConvocatoria, this.idPostulante).subscribe({
      next: (res) => {
        this.postulante = res;
        this.userConvocatoria.aceptado = res.datosAdicionales.aceptado;
        console.log('Postulante encontrado:', this.postulante);
        /* this.imagenService.obtenerPdf(this.postulante.datosAdicionales.curriculum).subscribe({
          next: (res) => {
            let objectURL = URL.createObjectURL(res);
            this.pdfSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            console.log(this.pdfSrc);
          },
          error: (err) => {
            console.error('Error al obtener el PDF', err);
          }
        }); */
      },
      error: (err) => {
        console.error('Error al obtener postulante:', err);
      }
    });
  }



  cambiarEstado(isAccepted: boolean) {
    this.isPostulating = true;
    this.convocatoriaService.obtenerConvocatoria(this.idConvocatoria).subscribe({
      next: (res) => {
        const email = {
          destinatario: this.postulante.correo,
          idPostulante: this.postulante.id,
          idConvocatoria: this.idConvocatoria,
          tituloConvocatoria: res.titulo,
          aceptado: isAccepted,
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

}
