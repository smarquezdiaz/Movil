import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Empresa } from 'src/app/modelos/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ModalConfirmacionComponent } from 'src/app/shared/componentes/modal-confirmacion/modal-confirmacion.component';
import { ModalExitoComponent } from 'src/app/shared/componentes/modal-exito/modal-exito.component';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.page.html',
  styleUrls: ['./register-company.page.scss'],
})
export class RegisterCompanyPage implements OnInit {

  form! : FormGroup;
 
  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required],
      imagen: ['/imagen/nuevo.png', Validators.required],
      nit: ['', Validators.required],
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required],
      confirmContrasenia: ['', Validators.required],
      rol: ['empresa', Validators.required],
    });
  }

  async openModal () {
    const modal = await this.modalCtrl.create({
      component: ModalConfirmacionComponent,
      componentProps: {
        function: () => this.registrarEmpresa(this.form.value) 
      }
    });
    modal.present();
  }

  registrarEmpresa(empresa : Empresa) {
    console.log(empresa);
    this.empresaService.crearEmpresa(empresa).subscribe({
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
    });
    modal1.present();
  }
}
