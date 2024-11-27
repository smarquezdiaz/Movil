import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-subir-imagen',
  templateUrl: './subir-imagen.page.html',
  styleUrls: ['./subir-imagen.page.scss'],
})
export class SubirImagenPage {
  image: string | undefined;

  constructor() {}

  async uploadImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
    });
    this.image = image.dataUrl;
  }

  crear() {
  }
}
