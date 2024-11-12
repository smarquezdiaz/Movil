import { Component, OnInit , ViewChild, ElementRef, Renderer2} from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Empresa } from 'src/app/modelos/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ModalConfirmacionComponent } from 'src/app/shared/componentes/modal-confirmacion/modal-confirmacion.component';
import { ModalExitoComponent } from 'src/app/shared/componentes/modal-exito/modal-exito.component';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ImagenService } from 'src/app/services/imagen.service';
import { Imagen } from 'src/app/modelos/imagen';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.page.html',
  styleUrls: ['./register-company.page.scss'],
})
export class RegisterCompanyPage implements OnInit {

  form! : FormGroup;
  image: string | undefined;
 
  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService,
    private imagenService: ImagenService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required],
      imagen: [''],
      nit: ['', Validators.required],
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required],
      confirmContrasenia: ['', Validators.required],
      rol: ['empresa', Validators.required],
    });
    this.form.get('confirmContrasenia')?.setValidators([this.passwordValidator()]);
  }

  async openModal () {
    const modal = await this.modalCtrl.create({
      component: ModalConfirmacionComponent,
      componentProps: {
        function: () => this.registrarEmpresa(this.form.value) 
      }
    });
    modal.present();
  }

  async registrarEmpresa(empresa : Empresa) {
    const imageUrl = await this.uploadImage();
    if (imageUrl) {
      empresa.imagen = imageUrl;
    }
    this.empresaService.crearEmpresa(empresa).subscribe({
      next: (response) => 
        {
          this.success();
        },
        error: (error) => {
          console.error('Error en el servicio:', error);
        }
    });
  }

  async success () {
    const modal1 = await this.modalCtrl.create({
      component: ModalExitoComponent,
    });
    modal1.present();
  }
  public passwordValidator(): ValidatorFn {
    return () => {
      const password = this.form.get('contrasenia')?.value;
      const repeat_password = this.form.get('confirmContrasenia')?.value;
  
      if (!password || !repeat_password) return { passwordMismatch: true };
  
      return password !== repeat_password ? { passwordMismatch: true } : null;
    };
  }
  
  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
    });
  
    this.image = image.dataUrl;
  }

  async uploadImage(): Promise<string | null> {
    if (this.image) {
      const response = await fetch(this.image);
      const blob = await response.blob();
      const imageName = 'image_' + new Date().getTime() + '.jpg'; 
      const file = new File([blob], imageName, { type: 'image/jpeg' });
      const formData = new FormData();
      formData.append('file', file);
  
      return new Promise((resolve, reject) => {
        this.imagenService.subirImagen(formData).subscribe({
          next: (response) => {
            const imageUrl = response;  
            resolve(imageUrl);
          },
          error: (error) => {
            console.error('Error al subir la imagen:', error);
            reject('Error al subir la imagen');
          }
        });
      });
    }
    return null;  
  }
  
}
