import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './componentes/header/header.component';
import { IonicModule } from '@ionic/angular';
import { ModalConfirmacionComponent } from './componentes/modal-confirmacion/modal-confirmacion.component';
import { ModalExitoComponent } from './componentes/modal-exito/modal-exito.component';



@NgModule({
  declarations: [HeaderComponent,ModalConfirmacionComponent, ModalExitoComponent],
  exports: [HeaderComponent,ModalConfirmacionComponent,ModalExitoComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class SharedModule { }
