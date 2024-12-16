import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConvocatoriaForTableDTO } from 'src/app/_DTO/convocatoriaForTableDTO';
import { EmpresaDTO } from 'src/app/_DTO/empresaDTO';
import { EmpresaService } from 'src/app/services/empresa.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageService } from 'src/app/services/image.service';  // Importamos el servicio de imágenes

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
  imageEmpresa: SafeUrl;  // Variable para manejar la imagen de manera segura
  convocatorias: ConvocatoriaForTableDTO[] = [];

  private apiUrl: string = environment.api;

  constructor(
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,  // Usamos el sanitizer para URLs seguras
    private imageService: ImageService  // Inyectamos el ImageService
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
      if (data.imagen) {
        // Llamamos al servicio de imagen para obtener la imagen de manera segura
        this.obtenerImagenEmpresa(data.imagen);
      }
      this.empresa = data;  // Asignamos el resto de la información de la empresa
    }, (error) => {
      console.error('Error al cargar los detalles de la empresa', error);
    });
  }

  // Obtener la imagen de la empresa utilizando ImageService
  obtenerImagenEmpresa(imagenUrl: string) {
    this.imageService.obtenerImagen(imagenUrl).subscribe({
      next: (res) => {
        let objectURL = URL.createObjectURL(res);  // Convertimos el blob en un URL de objeto
        this.imageEmpresa = this.sanitizer.bypassSecurityTrustUrl(objectURL);  // Sanitizamos la URL para que sea segura
      },
      error: (error) => {
        console.log('Error al obtener la imagen:', error);
        // Aquí podrías establecer una imagen por defecto si la carga falla
      }
    });
  }

  // Actualizar los detalles de la empresa (opcional)
  onUpdateEmpresa() {
    let nuevoDTO = new EmpresaDTO();
    nuevoDTO = {
      ...this.empresa
    }

    this.empresaService.updateEmpresa(parseInt(this.empresa.id), nuevoDTO).subscribe({
      next: (response: any) => {
        alert('Datos de la empresa actualizados exitosamente');
      },
      error: (err) => {
        console.error(err);
        alert('Error al actualizar los datos');
      },
    });
  }
}

    });
  }
}

