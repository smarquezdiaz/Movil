import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { ConvocatoriaInfo } from 'src/app/modelos/convocatoria';
import { AuthService } from 'src/app/services/auth.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  titles = ['Título', 'Nro.postulantes','']
  list!: ConvocatoriaInfo[];
  userId!: number;

  constructor(private empresaService: EmpresaService,
    private utilsService: UtilsService,
    private navCtrl: NavController,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarConvocatorias();
  }

  ionViewWillEnter() {
    this.cargarConvocatorias();
  }

  cargarConvocatorias () {
    this.userId = this.utilsService.getFromLocalStorage('userId');
    console.log(this.userId);
    const convocatorias$ = this.empresaService.obtenerConvocatoriasPorEmpresa(this.userId);
    forkJoin([convocatorias$]).subscribe({
      next: ([convocatoriasBody]) => {
        this.list = convocatoriasBody.map((convocatoria: any) => ({
          id: convocatoria.id,
          titulo: convocatoria.titulo,
          cantidadMaxPost: convocatoria.cantidadMaxPost,
          postulantes: convocatoria.postulantes,
        }));
      }
    })
  }

  mostrarConvocatoria(id: number) {
    this.router.navigate(['/home/mostrar-convocatoria',id]);
  }
}