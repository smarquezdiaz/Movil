import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Postulante } from 'src/app/modelos/postulante';
import { PostulanteService } from 'src/app/services/postulante.service';
import { ModalConfirmacionComponent } from 'src/app/shared/componentes/modal-confirmacion/modal-confirmacion.component';
import { ModalExitoComponent } from 'src/app/shared/componentes/modal-exito/modal-exito.component';

@Component({
  selector: 'app-register-postulante',
  templateUrl: './register-postulante.page.html',
  styleUrls: ['./register-postulante.page.scss'],
})
export class RegisterPostulantePage implements OnInit {
  form! : FormGroup;
  constructor(private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private postulanteService: PostulanteService,) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      carrera: ['',Validators.required],
      descripcion: ['', Validators.required],
      celular: ['', Validators.required],
      correo: ['', Validators.required],
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required],
      confirmContrasenia: ['', Validators.required],
      rol: ['postulante', Validators.required],
    });
    this.form.get('confirmContrasenia')?.setValidators([this.passwordValidator()]);
  }

  async openModal () {
    const modal = await this.modalCtrl.create({
      component: ModalConfirmacionComponent,
      componentProps: {
        function: () => this.registrarPostulante(this.form.value) 
      }
    });
    modal.present();
  }

  async registrarPostulante(postulante : Postulante) {
    this.postulanteService.registrarPostulante(postulante).subscribe({
      next: (response) => 
        {
          this.success();
        },
        error: (error) => {
          console.error('Error en el servicio:', error);
        }
    });
  }

  async success () {
    const modal1 = await this.modalCtrl.create({
      component: ModalExitoComponent,
      componentProps: {
        ruta: '/login'
      }
    });
    modal1.present();
  }
  public passwordValidator(): ValidatorFn {
    return () => {
      const password = this.form.get('contrasenia')?.value;
      const repeat_password = this.form.get('confirmContrasenia')?.value;
  
      if (!password || !repeat_password) return { passwordMismatch: true };
  
      return password !== repeat_password ? { passwordMismatch: true } : null;
    };
  }
}
