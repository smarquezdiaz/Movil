import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import {  ModalController } from '@ionic/angular';
import { ConvocatoriaParaPostulantes } from 'src/app/modelos/convocatoria';
import { PostulanteDto } from 'src/app/modelos/postulante';
import { ConvocatoriaService } from 'src/app/services/convocatoria.service';
import { ImagenService } from 'src/app/services/imagen.service';
import { PostulanteService } from 'src/app/services/postulante.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ModalExitoComponent } from 'src/app/shared/componentes/modal-exito/modal-exito.component';



@Component({
  selector: 'app-mostrar-convocatoria-postulante',
  templateUrl: './mostrar-convocatoria-postulante.page.html',
  styleUrls: ['./mostrar-convocatoria-postulante.page.scss'],
})
export class MostrarConvocatoriaPostulantePage implements OnInit {

  idConvocatoria!: number;
  convocatoria!: ConvocatoriaParaPostulantes; 
  imageEmpresa!: any;
  imageConvocatoria!: any;
  selectedFile: File | null = null; 
  uploadedFileName: string | null = null; 
  uploadedUrl: string | null = null;
  isUploading: boolean = false;
  userId!: number;
  isModalOpen = false;
  postulante!: PostulanteDto;
  isPostulated: boolean = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  

  constructor(private convocatoriaService: ConvocatoriaService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private modalController: ModalController,
    private imagenService: ImagenService,
    private postulanteService: PostulanteService,
    private utilsService: UtilsService,
  ) { }

  ngOnInit() {
    this.userId = this.utilsService.getFromLocalStorage('userId');
    this.route.params.subscribe(params => {
      this.idConvocatoria = params['idConvocatoria'];
      console.log(this.idConvocatoria);
    })
    this.convocatoriaService.obtenerConvocatoriaParaPostulante(this.idConvocatoria).subscribe({
      next: (res) => {
        this.convocatoria = res;
        this.obtenerImagenEmpresa(this.convocatoria.empresa.imagen);
        this.obtenerImagenConvocatoria(this.convocatoria.imagen);
      }
    });
    this.postulanteService.obtenerPostulantePorConvocatoria(this.idConvocatoria, this.userId).subscribe({
      next: (res) => {
        this.isPostulated = true;
      },error: () => {
        this.isPostulated = false;
      }

    })
  }

  obtenerImagenEmpresa(url: string) {
    this.imagenService.obtenerImagen(url).subscribe({
      next: (res) => {
        let objectURL = URL.createObjectURL(res);
        this.imageEmpresa = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  obtenerImagenConvocatoria(url: string) {
    this.imagenService.obtenerImagen(url).subscribe({
      next: (res) => {
        let objectURL = URL.createObjectURL(res);
        this.imageConvocatoria = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  triggerFileInput() {
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
  onFileSelectedAndUpload(event: Event) {
    const input = event.target as HTMLInputElement;
  
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type !== 'application/pdf') {
        console.error('El archivo seleccionado no es un PDF.');
        return;
      }
      this.selectedFile = file;
      this.uploadedFileName = file.name; 
      this.uploadPDF(file);
    }
  }
  
  uploadPDF(file: File): void {
    const formData = new FormData();
    formData.append('file', file);
  
    this.isUploading = true; 
  
    this.imagenService.subirImagen(formData).subscribe({
      next: (response) => {
        this.uploadedUrl = response; 
        this.isUploading = false; 
        console.log('Archivo subido exitosamente:', this.uploadedUrl);
      },
      error: (error) => {
        this.isUploading = false; 
        console.error('Error al subir el archivo:', error);
      },
    });
  }

  postularse() {
    this.userId = this.utilsService.getFromLocalStorage('userId');
    if (!this.uploadedUrl) {
      console.error('El archivo de CV no ha sido cargado.');
      return;
    }
  
    const postulante = {
      curriculum: this.uploadedUrl 
    };
    if(this.convocatoria.id) {
      this.postulanteService.postularse(this.userId, this.convocatoria.id, postulante).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          console.log('exito?');
          this.setOpen(false);  
          this.success();
        },
        error: (error) => {
        }
      });
    }
  }


  async success () {
    const modal1 = await this.modalController.create({
      component: ModalExitoComponent,
      componentProps: {
        ruta: '/home-postulante'
      }
    });
    modal1.present();
  }

  
}
