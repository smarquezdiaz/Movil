import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../services/empresa.service';
import { ConvocatoriaService } from '../services/convocatoria.service';

@Component({
  selector: 'app-perfil-empresa',
  templateUrl: './perfil-empresa.page.html',
  styleUrls: ['./perfil-empresa.page.scss'],
})
export class PerfilEmpresaPage implements OnInit {
  empresa: any = {
    nombre: '',
    ubicacion: '',
    imagen: '',
    nit: '',
    contrasenia: '',
  };
  convocatorias: any[] = [];

  constructor(
    private empresaService: EmpresaService,
    private convocatoriaService: ConvocatoriaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const idEmpresa = this.route.snapshot.paramMap.get('id');
    if (idEmpresa) {
      this.getEmpresaDetails(Number(idEmpresa));
      this.getConvocatoriasPasadas(Number(idEmpresa));
    }
  }

  // Obtener los detalles de la empresa
  getEmpresaDetails(idEmpresa: number) {
    this.empresaService.getEmpresa(idEmpresa).subscribe((data) => {
      this.empresa = data;
    });
  }

  // Obtener convocatorias pasadas
  getConvocatoriasPasadas(idEmpresa: number) {
    this.convocatoriaService.getConvocatoriasVigentes(idEmpresa, false).subscribe((data) => {
      this.convocatorias = data;
    });
  }

  // Actualizar los detalles de la empresa
  onUpdateEmpresa() {
    const idEmpresa = this.empresa.id;
    this.empresaService.updateEmpresa(idEmpresa, this.empresa).subscribe({
      next: (response) => {
        alert('Datos de la empresa actualizados exitosamente');
      },
      error: (err) => {
        console.error(err);
        alert('Error al actualizar los datos');
      },
    });
  }
}
