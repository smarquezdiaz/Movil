
import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../models/empresa.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil-empresa',
  templateUrl: './perfil-empresa.page.html',
  styleUrls: ['./perfil-empresa.page.scss'],
})
export class PerfilEmpresaPage implements OnInit {
  empresa: Empresa | null = null;
  idEmpresa: string;

  constructor(
    private empresaService: EmpresaService,
    private activatedRoute: ActivatedRoute
  ) {
    this.idEmpresa = this.activatedRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    this.loadEmpresa();
  }

  // Cargar datos de la empresa
  loadEmpresa() {
    this.empresaService.getEmpresa(this.idEmpresa).subscribe((data) => {
      this.empresa = data;
    });
  }

  // Guardar cambios de la empresa
  saveChanges() {
    if (this.empresa) {
      this.empresaService.updateEmpresa(this.idEmpresa, this.empresa).subscribe((data) => {
        this.empresa = data; // Actualizar los datos de la empresa con la respuesta
      });
    }
  }
}
