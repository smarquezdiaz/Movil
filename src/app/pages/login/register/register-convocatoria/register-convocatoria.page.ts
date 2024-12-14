import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ConvocatoriaService } from 'src/app/services/convocatoria.service';
import { ModalConfirmacionComponent } from 'src/app/shared/componentes/modal-confirmacion/modal-confirmacion.component';
import { ModalExitoComponent } from 'src/app/shared/componentes/modal-exito/modal-exito.component';
import { Convocatoria } from 'src/app/modelos/convocatoria';
import { IonDatetime, IonModal } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ImagenService } from 'src/app/services/imagen.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-register-convocatoria',
  templateUrl: './register-convocatoria.page.html',
  styleUrls: ['./register-convocatoria.page.scss'],
})
export class RegisterConvocatoriaPage implements OnInit {
  
  @ViewChild(IonModal) modal!: IonModal;
  form!: FormGroup;
  image: string | undefined;
  selectedDate: string = '';
  currentField!: 'fechaInicioReclutamiento' | 'fechaFinReclutamiento' | 'fechaInicioSeleccion' | 'fechaFinSeleccion';  // Aseguramos que el tipo sea correcto
  userId!: number;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private convocatoriaService: ConvocatoriaService,
    private imagenService: ImagenService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.userId = this.utilsService.getFromLocalStorage('userId');
    this.form = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaInicioReclutamiento: ['', Validators.required],
      fechaFinReclutamiento: ['', Validators.required],
      fechaInicioSeleccion: ['', Validators.required],
      fechaFinSeleccion: ['', Validators.required],
      cantidadMaxPost: ['', Validators.required],
      imagen: [''],
      empresa: [this.userId = this.utilsService.getFromLocalStorage('userId')]
    }, { validators: [this.fechaFinNoMenorQueInicio] });
    this.form.patchValue({empresa: this.userId});
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
  
  openDatetimeModal(field: 'fechaInicioReclutamiento' | 'fechaFinReclutamiento' | 'fechaInicioSeleccion' | 'fechaFinSeleccion') {
    this.currentField = field;  
    let initialDate: Date;
    if (this.form.get(field)?.value) {
      initialDate = new Date(this.form.get(field)?.value);
    } else {
      initialDate = new Date();
    }
    this.modal.present();
  }

  fechaFinNoMenorQueInicio(form: FormGroup) {
    const fechaInicioReclutamiento = form.get('fechaInicioReclutamiento')?.value;
    const fechaFinReclutamiento = form.get('fechaFinReclutamiento')?.value;
    const fechaInicioSeleccion = form.get('fechaInicioSeleccion')?.value;
    const fechaFinSeleccion = form.get('fechaFinSeleccion')?.value;

    // Validación para fechas de reclutamiento
    if (fechaInicioReclutamiento && fechaFinReclutamiento && new Date(fechaFinReclutamiento) < new Date(fechaInicioReclutamiento)) {
      return { fechaFinReclutamientoMenorQueInicio: true };
    }

    // Validación para fechas de selección
    if (fechaInicioSeleccion && fechaFinSeleccion && new Date(fechaFinSeleccion) < new Date(fechaInicioSeleccion)) {
      return { fechaFinSeleccionMenorQueInicio: true };
    }

    return null;
  }

  onDateSelected(event: any) {
    const selectedDate = new Date(event.detail.value);
    this.form.get(this.currentField)?.setValue(selectedDate.toISOString().split('T')[0]);
    this.modal.dismiss();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalConfirmacionComponent,
      componentProps: {
        function: () => this.registrarConvocatoria(this.form.value)
      }
    });
    await modal.present();
    const backdrop = document.querySelector('ion-backdrop');
    if (backdrop) {
      backdrop.setAttribute('tabindex', '-1');
    }
  }

  async registrarConvocatoria(convocatoria: Convocatoria) {
    const imageUrl = await this.uploadImage();
    console.log('imagen: ', imageUrl);
    if (imageUrl) {
      convocatoria.imagen = imageUrl;
     }
    console.log('Datos de la convocatoria que se enviarán:', convocatoria);
    this.convocatoriaService.crearConvocatoria(convocatoria).subscribe(
      async (response: Convocatoria) => {
        console.log('Convocatoria creada:', response);
        await this.success();
      },
      error => {
        console.error('Error al crear convocatoria:', convocatoria);
      }
    );
  }

  async success() {
    const modal1 = await this.modalCtrl.create({
      component: ModalExitoComponent,
      componentProps: {
        ruta: '/home'
      }
    });
    await modal1.present();
  }
}
