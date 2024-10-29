import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalConfirmacionComponent } from 'src/app/shared/componentes/modal-confirmacion/modal-confirmacion.component';
import { ModalExitoComponent } from 'src/app/shared/componentes/modal-exito/modal-exito.component';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.page.html',
  styleUrls: ['./register-company.page.scss'],
})
export class RegisterCompanyPage implements OnInit {
 
  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async openModal () {
    const modal = await this.modalCtrl.create({
      component: ModalConfirmacionComponent,
      componentProps: {
        function: () => this.registrarEmpresa() // MANDAR THIS.FORM.VALUE
      }
    });
    modal.present();
  }

  registrarEmpresa() {
    console.log('Registrando Empresa');
    this.success();
  }

  async success () {
    const modal1 = await this.modalCtrl.create({
      component: ModalExitoComponent,
    });
    modal1.present();
  }
}
