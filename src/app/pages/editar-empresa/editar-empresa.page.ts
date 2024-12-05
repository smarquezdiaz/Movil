import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaDTO } from '../../models/empresa.dto';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.page.html',
  styleUrls: ['./editar-empresa.page.scss'],
})
export class EditarEmpresaPage implements OnInit {
  empresa: EmpresaDTO | null = null;
  empresaId: number;

  constructor(
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.empresaId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
  }

  ngOnInit() {
    this.obtenerEmpresa();
  }

  obtenerEmpresa() {
    this.empresaService.obtenerEmpresa(this.empresaId).subscribe((empresa) => {
      this.empresa = empresa;
    });
  }

  actualizarEmpresa() {
    if (this.empresa) {
      this.empresaService.actualizarEmpresa(this.empresaId, this.empresa).subscribe(() => {
        this.router.navigate(['/perfil-empresa']);
      });
    }
  }
}
