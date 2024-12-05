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
  loadingEmpresa: boolean = false;
  loadingConvocatorias: boolean = false;
  errorMessageEmpresa: string = '';
  errorMessageConvocatorias: string = '';
  convocatoriasPasadas: any[] = [];

  constructor(
    private empresaService: EmpresaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    this.idEmpresa = idParam ? +idParam : null;

    if (!this.idEmpresa) {
      this.router.navigate(['/home']);
      return;
    }

    this.loadEmpresa();
    this.loadConvocatoriasPasadas();
  }

  loadEmpresa() {
    this.loadingEmpresa = true;
    this.errorMessageEmpresa = '';
    this.empresaService.getEmpresa(this.idEmpresa!).subscribe({
      next: (data) => {
        this.empresa = data;
        this.loadingEmpresa = false;
      },
      error: (err) => {
        console.error('Error al cargar la empresa:', err);
        this.errorMessageEmpresa = 'No se pudo cargar la información de la empresa.';
        this.loadingEmpresa = false;
      },
    });
  }

  saveChanges() {
    if (this.empresa && this.idEmpresa) {
      this.errorMessageEmpresa = '';
      this.empresaService.updateEmpresa(this.idEmpresa, this.empresa).subscribe({
        next: () => {
          console.log('Cambios guardados exitosamente');
        },
        error: (err) => {
          console.error('Error al guardar los cambios:', err);
          this.errorMessageEmpresa = 'No se pudieron guardar los cambios. Intenta nuevamente.';
        },
      });
    }
  }

  loadConvocatoriasPasadas() {
    this.loadingConvocatorias = true;
    this.errorMessageConvocatorias = '';
    this.empresaService.getConvocatorias(this.idEmpresa!).subscribe({
      next: (data) => {
        this.convocatoriasPasadas = data.filter((convocatoria) => new Date(convocatoria.fechaFin) < new Date());
        this.loadingConvocatorias = false;
      },
      error: (err) => {
        console.error('Error al cargar las convocatorias pasadas:', err);
        this.errorMessageConvocatorias = 'No se pudieron cargar las convocatorias.';
        this.loadingConvocatorias = false;
      },
    });
  }
}
