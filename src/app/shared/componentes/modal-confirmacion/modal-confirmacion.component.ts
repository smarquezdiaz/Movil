import { Component, OnInit,Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.scss'],
})
export class ModalConfirmacionComponent  implements OnInit {
 
  @Input() function?: () => void; 

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  cancelar () {
    this.modalCtrl.dismiss();
  }

  confirmar () {
    if (this.function) {
      this.function(); 
      this.modalCtrl.dismiss();
    }
  }
}
