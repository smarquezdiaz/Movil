import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './componentes/header/header.component';
import { IonicModule } from '@ionic/angular';
import { DialogoConfirmacionComponent } from './componentes/dialogo-confirmacion/dialogo-confirmacion.component';



@NgModule({
  declarations: [HeaderComponent,DialogoConfirmacionComponent],
  exports: [HeaderComponent,DialogoConfirmacionComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class SharedModule { }
