import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ConvocatoriaService } from 'src/app/services/convocatoria.service';
import { ModalConfirmacionComponent } from 'src/app/shared/componentes/modal-confirmacion/modal-confirmacion.component';
import { ModalExitoComponent } from 'src/app/shared/componentes/modal-exito/modal-exito.component';
import { Convocatoria } from 'src/app/modelos/convocatoria';
import { IonDatetime } from '@ionic/angular';

@Component({
  selector: 'app-register-convocatoria',
  templateUrl: './register-convocatoria.page.html',
  styleUrls: ['./register-convocatoria.page.scss'],
})
export class RegisterConvocatoriaPage implements OnInit {
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
      imagen: ['', Validators.required]
    });
  }

  openDatetimeModal(field: 'fechaInicio' | 'fechaFin') {
    this.currentField = field;
    this.modalCtrl.create({
      component: IonDatetime,
      componentProps: {
        value: this.selectedDate
      }
    }).then(modal => {
      modal.present();
      modal.onDidDismiss().then((data) => {
        if (data.data) {
          this.selectedDate = data.data;
          this.onDateChange();
        }
      });
    });
  }


  onDateChange() {
    if (this.currentField === 'fechaInicio') {
      this.form.controls['fechaInicio'].setValue(this.selectedDate);
    } else if (this.currentField === 'fechaFin') {
      this.form.controls['fechaFin'].setValue(this.selectedDate);
    }

  }


  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalConfirmacionComponent,
      componentProps: {
        function: () => this.registrarConvocatoria(this.form.value)
      }
    });
    await modal.present();
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
