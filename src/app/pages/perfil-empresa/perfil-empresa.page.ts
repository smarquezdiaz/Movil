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
  idEmpresa: number | null = null;
  loading: boolean = false; // Indicador de carga
  errorMessage: string = ''; 

  constructor(
    private empresaService: EmpresaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const idEmpresa = this.activatedRoute.snapshot.paramMap.get('id');
    this.idEmpresa = idEmpresa ? +idEmpresa : null;

    if (!this.idEmpresa) {
      this.router.navigate(['/home']);
      return;
    }

    this.loadEmpresa();
  }

  loadEmpresa() {
    this.loading = true; 
    this.errorMessage = ''; 
    this.empresaService.getEmpresa(this.idEmpresa!).subscribe({
      next: (data) => {
        this.empresa = data;
        this.loading = false; 
      },
      error: (err) => {
        console.error('Error al cargar la empresa:', err);
        this.errorMessage = 'No se pudo cargar la información de la empresa. Intenta nuevamente.';
        this.loading = false; 
      },
    });
  }

  saveChanges() {
    if (this.empresa && this.idEmpresa) {
      this.errorMessage = ''; 
      this.empresaService.updateEmpresa(this.idEmpresa, this.empresa).subscribe({
        next: () => {
          console.log('Cambios guardados exitosamente');
        },
        error: (err) => {
          console.error('Error al guardar los cambios:', err);
          this.errorMessage = 'No se pudieron guardar los cambios. Intenta nuevamente.';
        },
      });
    }
  }
}
