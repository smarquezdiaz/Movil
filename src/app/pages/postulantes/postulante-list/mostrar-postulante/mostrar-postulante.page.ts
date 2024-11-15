import { Component, OnInit } from '@angular/core';
import { ModalConfirmacionComponent } from 'src/app//shared/componentes/modal-confirmacion/modal-confirmacion.component';
import { ModalExitoComponent } from 'src/app/shared/componentes/modal-exito/modal-exito.component';
import { ActivatedRoute } from '@angular/router';
import { User, UserConvocatoria } from 'src/app/modelos/user';
import { PostulanteService } from 'src/app/services/postulante.service';
import { ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-mostrar-postulante',
  templateUrl: './mostrar-postulante.page.html',
  styleUrls: ['./mostrar-postulante.page.scss'],
})
export class MostrarPostulantePage implements OnInit {

  idConvocatoria!: number;  
  idPostulante!: number;  
  postulante!: User;
  userConvocatoria: any = {};

  constructor(
    private route: ActivatedRoute,
    private postulanteService: PostulanteService,
    private formBuilder: FormBuilder, 
    private modalController: ModalController  
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idConvocatoria = params['idConvocatoria'];
      this.idPostulante = params['idPostulante'];
      console.log('ID Convocatoria:', this.idConvocatoria);
      console.log('ID Postulante:', this.idPostulante);

      this.obtenerPostulante();
    });
  }


  obtenerPostulante() {
    this.postulanteService.obtenerPostulantePorConvocatoria(this.idConvocatoria, this.idPostulante).subscribe({
      next: (res) => {
        this.postulante = res;
        console.log('Postulante encontrado:', this.postulante);
      },
      error: (err) => {
        console.error('Error al obtener postulante:', err);
      }
    });
  }

  async confirmarCambioEstado() {
    const modal = await this.modalController.create({
      component: ModalConfirmacionComponent,
      componentProps: {
        function: () => this.cambiarEstado() 
      }
    });
    await modal.present();
  }

  cambiarEstado() {
    const nuevoEstado = this.userConvocatoria.aceptado ? 'rechazado' : 'aceptado';
    
    this.postulanteService.cambiarEstadoPostulante(this.idConvocatoria, this.idPostulante, nuevoEstado).subscribe({
      next: (res) => {
        this.userConvocatoria.estado = nuevoEstado;  
        console.log('Estado actualizado:', res);
        this.showSuccessModal(); 
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
