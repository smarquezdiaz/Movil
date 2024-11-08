import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ConvocatoriaService } from 'src/app/services/convocatoria.service';
import { ModalConfirmacionComponent } from 'src/app/shared/componentes/modal-confirmacion/modal-confirmacion.component';
import { ModalExitoComponent } from 'src/app/shared/componentes/modal-exito/modal-exito.component';
import { Convocatoria } from 'src/app/modelos/convocatoria';
import { IonDatetime, IonModal } from '@ionic/angular';

@Component({
  selector: 'app-register-convocatoria',
  templateUrl: './register-convocatoria.page.html',
  styleUrls: ['./register-convocatoria.page.scss'],
})
export class RegisterConvocatoriaPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  form!: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;
  selectedDate: string = '';
  currentField!: 'fechaInicio' | 'fechaFin';

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private convocatoriaService: ConvocatoriaService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      cantidadMaxPost: ['', Validators.required],
      imagen: [''],

    }, { validators: [this.fechaFinNoMenorQueInicio] }
    );
  }

  openDatetimeModal(field: 'fechaInicio' | 'fechaFin') {
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
    const fechaInicio = form.get('fechaInicio')?.value;
    const fechaFin = form.get('fechaFin')?.value;


    if (fechaInicio && fechaFin && new Date(fechaFin) < new Date(fechaInicio)) {
      return { fechaFinMenorQueInicio: true };
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

  registrarConvocatoria(convocatoriaData: Convocatoria) {
    convocatoriaData.imagen = this.selectedImage as string;
    this.convocatoriaService.crearConvocatoria(convocatoriaData).subscribe(
      async (response: Convocatoria) => {
        console.log('Convocatoria creada:', response);
        await this.success();
      },
      error => {
        console.error('Error al crear convocatoria:', error);
      }
    );
  }

  async success() {
    const modal1 = await this.modalCtrl.create({
      component: ModalExitoComponent,
    });
    await modal1.present();
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.form.patchValue({ imagen: this.selectedImage });
      };
      reader.readAsDataURL(file);
    }
  }


}
