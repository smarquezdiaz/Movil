import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConvocatoriaForTableDTO } from 'src/app/_DTO/convocatoriaForTableDTO';
import { EmpresaDTO } from 'src/app/_DTO/empresaDTO';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-perfil-empresa',
  templateUrl: './perfil-empresa.page.html',
  styleUrls: ['./perfil-empresa.page.scss'],
})
export class PerfilEmpresaPage implements OnInit {
  empresa: any = {
    id:'',  // Cambié la tipificación para que coincida con el modelo correcto
    nombre: '',
    ubicacion: '',
    imagen: '',
    nit: '',
    contrasenia: '',
  };
  convocatorias: ConvocatoriaForTableDTO[] = [];  // Cambié la tipificación para que coincida con el modelo correcto

  constructor(
    private empresaService: EmpresaService, // Usamos el servicio EmpresaService
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const idEmpresa = localStorage.getItem('userId');
    if (idEmpresa) {
      this.getEmpresaDetails(Number(idEmpresa));  // Usamos el método adecuado
      this.getConvocatoriasPasadas(Number(idEmpresa));  // Usamos el método adecuado
    }
  }

  // Obtener los detalles de la empresa
  getEmpresaDetails(idEmpresa: number) {
    this.empresaService.getEmpresa(idEmpresa).subscribe((data:any) => {  // Corregimos el nombre del método
      this.empresa = data;
    });
  }

  // Obtener convocatorias pasadas
  getConvocatoriasPasadas(idEmpresa: number) {
    this.empresaService.getConvocatoriasVigentes(idEmpresa, false).subscribe((data) => {  // Usamos el método de EmpresaService
      this.convocatorias = data;
    });
  }

  // Actualizar los detalles de la empresa
  onUpdateEmpresa() {
    let nuevoDTO  = new EmpresaDTO();
    nuevoDTO = {
      ...this.empresa
    }

    this.empresaService.updateEmpresa(parseInt(this.empresa.id), nuevoDTO).subscribe({  // Corregimos el nombre del método
      next: (response:any) => {
        alert('Datos de la empresa actualizados exitosamente');
      },
      error: (err) => {
        console.error(err);
        alert('Error al actualizar los datos');
      },
    });
  }
}

