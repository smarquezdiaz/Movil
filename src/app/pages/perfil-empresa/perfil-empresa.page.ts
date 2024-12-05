import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../modelos/empresa';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-perfil-empresa',
  templateUrl: './perfil-empresa.page.html',
  styleUrls: ['./perfil-empresa.page.scss'],
})
export class PerfilEmpresaPage implements OnInit {
  empresa: Empresa | null = null;
  idEmpresa: string | null = null;

  constructor(
    private empresaService: EmpresaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.idEmpresa = this.activatedRoute.snapshot.paramMap.get('id');

    if (!this.idEmpresa) {
      this.router.navigate(['/home']);
      return;
    }

    this.loadEmpresa();
  }

  loadEmpresa() {
    this.empresaService.getEmpresa(this.idEmpresa!).subscribe({
      next: (data) => {
        this.empresa = data;
      },
      error: (err) => {
        console.error('Error al cargar la empresa:', err);
      },
    });
  }

  saveChanges() {
    if (this.empresa && this.idEmpresa) {
      this.empresaService.updateEmpresa(this.idEmpresa, this.empresa).subscribe({
        next: (data) => {
          this.empresa = data;
          console.log('Cambios guardados exitosamente');
        },
        error: (err) => {
          console.error('Error al guardar los cambios:', err);
        },
      });
    }
  }
}
