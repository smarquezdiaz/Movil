import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../models/empresa';
import { ActivatedRoute, Router} from '@angular/router'; 

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
  ) { 
  
  }

  ngOnInit() {
  this.idEmpresa = this.activatedRoute.snapshot.paramMap.get('id');

  if (!this.idEmpresa) {
    this.router.navigate(['/home']);
  } else {
    this.loadEmpresa();
  }
}

loadEmpresa() {
    if (this.idEmpresa) {
      this.empresaService.getEmpresa(this.idEmpresa).subscribe((data) => {
        this.empresa = data;
      });
    }
  }
  
  
  saveChanges() {
    if (this.empresa && this.idEmpresa) {
      this.empresaService.updateEmpresa(this.idEmpresa, this.empresa).subscribe((data) => {
        this.empresa = data; 
      });
    }
  }
}
