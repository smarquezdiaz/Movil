import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { ConvocatoriaService } from '../../services/convocatoria.service';
import { EmpresaDTO } from '../../models/empresa.dto';
import { ConvocatoriaForTableDTO } from '../../models/convocatoria.dto';

@Component({
  selector: 'app-perfil-empresa',
  templateUrl: './perfil-empresa.page.html',
  styleUrls: ['./perfil-empresa.page.scss'],
})
export class PerfilEmpresaPage implements OnInit {
  empresa: EmpresaDTO | null = null;
  convocatorias: ConvocatoriaForTableDTO[] = [];

  constructor(
    private empresaService: EmpresaService,
    private convocatoriaService: ConvocatoriaService
  ) {}

  ngOnInit() {
    const empresaId = 1; 
    this.obtenerPerfilEmpresa(empresaId);
    this.obtenerConvocatorias(empresaId);
  }

  obtenerPerfilEmpresa(id: number) {
    this.empresaService.obtenerEmpresa(id).subscribe((empresa) => {
      this.empresa = empresa;
    });
  }

  obtenerConvocatorias(id: number) {
    this.convocatoriaService.obtenerConvocatoriasDeEmpresa(id).subscribe((convocatorias) => {
      this.convocatorias = convocatorias;
    });
  }
}
