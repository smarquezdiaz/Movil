import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PerfilEmpresaRoutingModule } from './perfil-empresa-routing.module';
import { PerfilEmpresaPage } from './perfil-empresa.page';
import { EmpresaService } from '../../services/empresa.service';
import { ConvocatoriaService } from '../../services/convocatoria.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilEmpresaRoutingModule
  ],
  declarations: [PerfilEmpresaPage],
  providers: [EmpresaService, ConvocatoriaService]
})
export class PerfilEmpresaPageModule {}
