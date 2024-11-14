import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-exito',
  templateUrl: './modal-exito.component.html',
  styleUrls: ['./modal-exito.component.scss'],
})
export class ModalExitoComponent  implements OnInit {

  @Input() ruta!: string;

  constructor(private modalCtrl: ModalController,
    private router: Router
  ) { }

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
    this.router.navigate([this.ruta]);
  }

}