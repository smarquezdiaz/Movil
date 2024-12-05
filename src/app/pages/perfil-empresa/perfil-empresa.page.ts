import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../services/empresa.service'; // Asegúrate de usar el servicio correcto

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
    private empresaService: EmpresaService, // Usamos el servicio EmpresaService
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const idEmpresa = this.route.snapshot.paramMap.get('id');
    if (idEmpresa) {
      this.getEmpresaDetails(Number(idEmpresa));  // Usamos el método adecuado
      this.getConvocatoriasPasadas(Number(idEmpresa));  // Usamos el método adecuado
    }
  }

  // Obtener los detalles de la empresa
  getEmpresaDetails(idEmpresa: number) {
    this.empresaService.obtenerEmpresa(idEmpresa).subscribe((data) => {  // Corregimos el nombre del método
      this.empresa = data;
    });
  }

  // Obtener convocatorias pasadas
  getConvocatoriasPasadas(idEmpresa: number) {
    this.empresaService.obtenerConvocatoriasVigentes(idEmpresa, false).subscribe((data) => {  // Usamos el método de EmpresaService
      this.convocatorias = data;
    });
  }

  // Actualizar los detalles de la empresa
  onUpdateEmpresa() {
    const idEmpresa = this.empresa.id;
    this.empresaService.actualizarEmpresa(idEmpresa, this.empresa).subscribe({  // Corregimos el nombre del método
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
