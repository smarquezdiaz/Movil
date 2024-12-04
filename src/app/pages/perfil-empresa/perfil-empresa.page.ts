import { Component, OnInit} from '@angular/core';
import { EmpresaService} from ' ../../services/empresa.service';
import { Empresa, Convocatoria} from '../../modelos/empresa';

@Component ({
  selector:'app-perfil-empresa',
  templateUrl: './perfil-empresa.page.html',
  styleUrls: [' ./perfil-empresa.page.scss'],
})
  export class PerfilEmpresaPage implements OnInit {
  empresa:Empresa | null= null;
  convocatoriasPasadas: Convocatoria [] = [];
  empresaId = 1;
  constructor(private empresaService: EmpresaService) {}
  ngOnInit() {
    this.cargarDatosEmpresa();
  }

  cargarDatosEmpresa(){
    this.empresaService.getEmpresaById(this.empresaId).subscribe((data) => {
      this.empresa = data;
      this.cargarConvocatoriasPasadas();
  });
  }

cargarConvocatoriasPasadas(){
  this.empresaService.getConvocatorias(this.empresaId).subscribe((convocatorias) => {
    this.convocatoriasPasadas = convocatorias.filter((c) => !c.vigente);
  });
}
  actualizarDatos() {
    if (this.empresa) {
      this.empresaService.updateEmpresa(this.empresa.id, this.empresa).subscribe(
        (response) => {
          console.log(' Datos actualizados correctamente:', response);
        },
        (error) => {
          console.error('Error al actualizar los datos:', error);
        }
        );  
    }
    }
  }
