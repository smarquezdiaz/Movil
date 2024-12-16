import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConvocatoriaForTableDTO } from 'src/app/_DTO/convocatoriaForTableDTO';
import { EmpresaDTO } from 'src/app/_DTO/empresaDTO';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ImagenService } from 'src/app/services/imagen.service'; 
import { environment } from 'src/environments/environment';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-perfil-empresa',
  templateUrl: './perfil-empresa.page.html',
  styleUrls: ['./perfil-empresa.page.scss'],
})
export class PerfilEmpresaPage implements OnInit {
  empresa: any = {
    id: '',  
    nombre: '',
    ubicacion: '',
    imagen: '',
    nit: '',
    contrasenia: '',
  };
  convocatorias: ConvocatoriaForTableDTO[] = [];  
  imageEmpresa!: SafeUrl;  

  private apiUrl: string = environment.api; 

  constructor(
    private empresaService: EmpresaService, 
    private route: ActivatedRoute,
    private imagenService: ImagenService,  
    private sanitizer: DomSanitizer  
  ) {}

  ngOnInit() {
    const idEmpresa = localStorage.getItem('userId');
    if (idEmpresa) {
      this.getEmpresaDetails(Number(idEmpresa));  
    }
  }

  // Obtener los detalles de la empresa
  getEmpresaDetails(idEmpresa: number) {
    this.empresaService.getEmpresa(idEmpresa).subscribe((data: any) => {  
      this.empresa = data;

      // Obtener y mostrar la imagen de la empresa si está disponible
      if (data.imagen) {
        this.getImagenEmpresa(data.imagen);  
      }
    });
  }

  // Obtener la imagen de la empresa
  getImagenEmpresa(nameImage: string) {
    this.imagenService.obtenerImagen(nameImage).subscribe({
      next: (res: Blob) => {
        let objectURL = URL.createObjectURL(res);
        this.imageEmpresa = this.sanitizer.bypassSecurityTrustUrl(objectURL);  // Usamos el sanitizer para asegurar la URL
      },
      error: (error) => {
        console.error('Error al obtener la imagen', error);
      }
    });
  }

  // Actualizar los detalles de la empresa
  onUpdateEmpresa() {
    let nuevoDTO = new EmpresaDTO();
    nuevoDTO = {
      ...this.empresa
    };

    this.empresaService.updateEmpresa(parseInt(this.empresa.id), nuevoDTO).subscribe({
      next: (response: any) => {
      },
      error: (err) => {
        console.error(err);
        alert('Error al actualizar los datos');
      },
    });
  }
}
