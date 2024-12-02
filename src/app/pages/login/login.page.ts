import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { async, from, Observable } from 'rxjs';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ConvocatoriaService } from 'src/app/services/convocatoria.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { AlertController } from '@ionic/angular';
import { PostulanteService } from 'src/app/services/postulante.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form!: FormGroup;
  rol!: string;
  constructor(
    private route : Router,
    private postulanteService : PostulanteService,
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService,
    private utilsService: UtilsService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required],
      rol: [null, Validators.required]
    })
  }

  handleChange (rol: string) {
    this.rol = rol;
  }

  async login () {
    if(!this.form.valid) {
      const alert = await this.alertController.create({
        header: 'Error',
        subHeader: 'Formulario inválido',
        message: 'Complete los datos correctamente.',
        buttons: ['ok'],
      });
      await alert.present();
    } else {
      if (this.rol) {
        if(this.rol === 'empresa') {
          this.empresaService.login(this.form.value).subscribe({
            next: (res) => {
              this.utilsService.saveInLocalStorage('userId', res);
              this.route.navigate(['/home']);
              this.form.reset();
            }, 
            error: async (error) => {
              //console.log(error);
              const alert = await this.alertController.create({
                header: 'Error',
                subHeader: 'No existe el usuario seleccionado',
                message: 'Introduzca un usuario válido.',
                buttons: ['ok'],
              });
              await alert.present();
            }
          })
        } else if(this.rol === 'postulante') {
          this.postulanteService.login(this.form.value).subscribe({
            next: (res) => {
              this.utilsService.saveInLocalStorage('userId', res);
              this.route.navigate(['/home-postulante']);
              this.form.reset();
            }, 
            error: async(error) => {
             //console.log(error);
              const alert = await this.alertController.create({
                header: 'Error',
                subHeader: 'No existe el usuario seleccionado',
                message: 'Introduzca un usuario válido.',
                buttons: ['ok'],
              });
              await alert.present();
            }
          })
        } else {
          const alert = await this.alertController.create({
            header: 'Error',
            subHeader: 'Debe seleccionar un rol',
            message: 'Seleccione rol empresa o postulante.',
            buttons: ['ok'],
          });
          await alert.present();
          this.form.reset();
        }
      }
    }
    }    
}
