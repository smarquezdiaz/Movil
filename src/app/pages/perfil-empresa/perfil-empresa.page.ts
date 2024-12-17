import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ConvocatoriaForTableDTO } from 'src/app/_DTO/convocatoriaForTableDTO';
import { EmpresaDTO } from 'src/app/_DTO/empresaDTO';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ImagenService } from 'src/app/services/imagen.service';
import { environment } from 'src/environments/environment';

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
  
  imagenEmpresa!: any;

  private apiUrl: string = environment.api; 

  constructor(
    private empresaService: EmpresaService, 
    private route: ActivatedRoute,
    private imagenService: ImagenService,
     private sanitizer: DomSanitizer,
     private alertController: AlertController
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
      this.imagenService.obtenerImagen(data.imagen).subscribe({
        next: (res) => {
          let objectURL = URL.createObjectURL(res);
          this.imagenEmpresa = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        },
        error: (error) => {
          console.log(error);
        }
      })
    });
  }

  // Actualizar los detalles de la empresa
    onUpdateEmpresa() {
    let nuevoDTO = new EmpresaDTO();
    nuevoDTO = {
      ...this.empresa
    };

     this.empresaService.updateEmpresa(parseInt(this.empresa.id), nuevoDTO).subscribe({
      next: async (response: any) => {
        const alert = await this.alertController.create({
          header: 'Éxito',
          subHeader: 'Actualización exitosa',
          message: 'La empresa se ha actualizado correctamente.',
          buttons: ['OK'],
        });
        
        await alert.present();
        
      },
      error: async (err) => {
        console.error(err);
        const alert = await this.alertController.create({
          header: 'Error',
          subHeader: 'Error al actualizar los datos',
          message: 'Consulte a un administrador.',
          buttons: ['ok'],
        });
      },
    });
  }
}
