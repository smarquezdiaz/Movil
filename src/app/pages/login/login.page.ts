import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { from, Observable } from 'rxjs';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private route : Router,
    private authService :AuthService,
    private empresaService: EmpresaService
  ) { }

  ngOnInit() {
    /* const empresa = {
      id: 4,
      nombre: 'Prueba',
      ubicacion: 'Prueba',
      imagen: 'Prueba',
      nit: 'Prueba',
      usuario: 'Prueba',
      contrasenia: 'Prueba',
      rol: 'Prueba',
    }
    this.empresaService.crearEmpresa(empresa).subscribe({
      next: (response) => 
        {
          console.log(response);
        },
        error: (error) => {
          console.error('Error en el servicio:', error);
        }
    }); */
  }
}
