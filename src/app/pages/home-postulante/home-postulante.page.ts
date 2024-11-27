import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { ConvocatoriaParaPostulantes } from 'src/app/modelos/convocatoria';
import { ConvocatoriaService } from 'src/app/services/convocatoria.service';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-home-postulante',
  templateUrl: './home-postulante.page.html',
  styleUrls: ['./home-postulante.page.scss'],
})
export class HomePostulantePage implements OnInit {

  image!: string;
  convocatoriaList!: ConvocatoriaParaPostulantes[];
  showTable =  false;

  constructor(private convocatoriaService : ConvocatoriaService, 
              private imagenService: ImagenService,
              private sanitizer: DomSanitizer,
              private router: Router
              ) { }

  ngOnInit() {
    this.cargarConvocatorias();
  }
  ionViewWillEnter() {
    this.cargarConvocatorias();
  }
  cargarConvocatorias () {
    this.convocatoriaService.obtenerConvocatorias().subscribe(res => {
      this.convocatoriaList = res;
      this.convocatoriaList.forEach(element => {
        this.imagenService.obtenerImagen(element.empresa.imagen).subscribe({
          next: (res) => {
            let objectURL = URL.createObjectURL(res);
            element.empresa.img = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          },
          error: (error) => {
            console.log(error);
          }
        })
        this.showTable = true;
      });
    })
  }
}