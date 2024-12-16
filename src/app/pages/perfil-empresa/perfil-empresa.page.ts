import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConvocatoriaForTableDTO } from 'src/app/_DTO/convocatoriaForTableDTO';
import { EmpresaDTO } from 'src/app/_DTO/empresaDTO';
import { EmpresaService } from 'src/app/services/empresa.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-perfil-empresa',
  templateUrl: './perfil-empresa.page.html',
  styleUrls: ['./perfil-empresa.page.scss'],
})
export class PerfilEmpresaPage implements OnInit {
  empresa: any = {
    id: '',  
    nombre: '',
    ubicacion: '',
    imagen: '',  
    nit: '',
    contrasenia: '',
  };
  convocatorias: ConvocatoriaForTableDTO[] = [];  

  private apiUrl: string = environment.api; 

  constructor(
    private empresaService: EmpresaService, 
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const idEmpresa = localStorage.getItem('userId');
    if (idEmpresa) {
      this.getEmpresaDetails(Number(idEmpresa));  
    }
  }

  // Obtener los detalles de la empresa
  getEmpresaDetails(idEmpresa: number) {
    this.empresaService.getEmpresa(idEmpresa).subscribe((data: any) => {  
      this.empresa = data;
    });
  }

  // Actualizar los detalles de la empresa
  onUpdateEmpresa() {
    let nuevoDTO = new EmpresaDTO();
    nuevoDTO = {
      ...this.empresa
    };

    this.empresaService.updateEmpresa(parseInt(this.empresa.id), nuevoDTO).subscribe({
      next: (response: any) => {
        alert('Datos de la empresa actualizados exitosamente');
      },
      error: (err) => {
        console.error(err);
        alert('Error al actualizar los datos');
      },
    });
  }
}
