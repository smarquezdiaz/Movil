import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './componentes/header/header.component';
import { IonicModule } from '@ionic/angular';
import { ModalConfirmacionComponent } from './componentes/modal-confirmacion/modal-confirmacion.component';
import { ModalExitoComponent } from './componentes/modal-exito/modal-exito.component';
import { BottomMenuComponent } from './componentes/bottom-menu/bottom-menu.component';
import { SubirImagenComponent } from './componentes/subir-imagen/subir-imagen.component';



@NgModule({
  declarations: [HeaderComponent,ModalConfirmacionComponent, ModalExitoComponent, BottomMenuComponent,SubirImagenComponent ],
  exports: [HeaderComponent,ModalConfirmacionComponent,ModalExitoComponent, BottomMenuComponent,SubirImagenComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class SharedModule { }
