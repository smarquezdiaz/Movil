import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { ConvocatoriaForTableDTO} from 'src/app/_DTO/convocatoriaForTableDTO';
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

  titles = ['Título', 'Nro.postulantes', '']
  list!: ConvocatoriaForTableDTO [] ; 
  userId!: number;
  isVigente: boolean = true;

  constructor(private empresaService: EmpresaService,
    private utilsService: UtilsService,
    private navCtrl: NavController,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarConvocatorias(); 
  }

  ionViewWillEnter() {
    this.cargarConvocatorias(); // Re-cargar convocatorias vigentes al entrar en la vista
  }

  cargarConvocatorias() {
    this.userId = this.utilsService.getFromLocalStorage('userId');
    console.log(this.userId);
    const convocatorias$ = this.empresaService.getConvocatorias(this.userId);
    forkJoin([convocatorias$]).subscribe({
      next: ([convocatoriasBody]) => {
        this.list = convocatoriasBody.map((convocatoria: any) => ({
            id: convocatoria.id || 0, 
            titulo: convocatoria.titulo || '',
            descripcion: convocatoria.descripcion || '',
            imagen: convocatoria.imagen || '',
            cantidadMaxPost: convocatoria.cantidadMaxPost || 0,
            vigente: convocatoria.vigente ?? false, 
            fechaInicioReclutamiento: convocatoria.fechaInicioReclutamiento || '',
            fechaFinReclutamiento: convocatoria.fechaFinReclutamiento || '',
            fechaInicioSeleccion: convocatoria.fechaInicioSeleccion || '',
            fechaFinSeleccion: convocatoria.fechaFinSeleccion || '',
            estado: convocatoria.estado || '',
            empresa: convocatoria.empresa || 0,
            postulantes: convocatoria.postulantes || 0,
          }));
          
      }
    });
  }

  cargarConvocatoriasVigentes() {
    this.isVigente = true;
    this.userId = this.utilsService.getFromLocalStorage('userId');
    const convocatorias$ = this.empresaService.getConvocatoriasVigentes(this.userId, true);
    forkJoin([convocatorias$]).subscribe({
      next: ([convocatoriasBody]) => {
        this.list = convocatoriasBody.map((convocatoria: any) => ({
          id: convocatoria.id || 0, 
            titulo: convocatoria.titulo || '',
            descripcion: convocatoria.descripcion || '',
            imagen: convocatoria.imagen || '',
            cantidadMaxPost: convocatoria.cantidadMaxPost || 0,
            vigente: convocatoria.vigente ?? false, 
            fechaInicioReclutamiento: convocatoria.fechaInicioReclutamiento || '',
            fechaFinReclutamiento: convocatoria.fechaFinReclutamiento || '',
            fechaInicioSeleccion: convocatoria.fechaInicioSeleccion || '',
            fechaFinSeleccion: convocatoria.fechaFinSeleccion || '',
            estado: convocatoria.estado || '',
            empresa: convocatoria.empresa || 0,
            postulantes: convocatoria.postulantes || 0,
        }));
      }
    });
  }

  cargarConvocatoriasNoVigentes() {
    this.isVigente = false;
    this.userId = this.utilsService.getFromLocalStorage('userId');
    const convocatorias$ = this.empresaService.getConvocatoriasVigentes(this.userId, false);
    forkJoin([convocatorias$]).subscribe({
      next: ([convocatoriasBody]) => {
        this.list = convocatoriasBody.map((convocatoria: any) => ({
          id: convocatoria.id || 0, 
            titulo: convocatoria.titulo || '',
            descripcion: convocatoria.descripcion || '',
            imagen: convocatoria.imagen || '',
            cantidadMaxPost: convocatoria.cantidadMaxPost || 0,
            vigente: convocatoria.vigente ?? false, 
            fechaInicioReclutamiento: convocatoria.fechaInicioReclutamiento || '',
            fechaFinReclutamiento: convocatoria.fechaFinReclutamiento || '',
            fechaInicioSeleccion: convocatoria.fechaInicioSeleccion || '',
            fechaFinSeleccion: convocatoria.fechaFinSeleccion || '',
            estado: convocatoria.estado || '',
            empresa: convocatoria.empresa || 0,
            postulantes: convocatoria.postulantes || 0,
        }));
      }
    });
  }

  handleChange(e: any) {
    if (e.detail.value) {
      console.log('Estado seleccionado: ' + e.detail.value);
      this.userId = this.utilsService.getFromLocalStorage('userId');
      this.empresaService.obtenerConvocatoriasPorEstado(this.userId, e.detail.value).subscribe({
        next: (res) => {
          this.list = res;
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      console.log('Sin estado seleccionado.');
      this.cargarConvocatorias();
    }
  }

  mostrarConvocatoria(id: number) {
    this.router.navigate(['/home/mostrar-convocatoria', id]);
  }

  changeColor(estado: string) {
    switch (estado) {
      case 'Por comenzar':
        return {
          'label-home_state1': true,
        };
      case 'En curso':
        return {
          'label-home_state2': true,
        };
      case 'En selección':
        return {
          'label-home_state3': true,
        };
      case 'Finalizado':
        return {
          'label-home_state4': true,
        };
      default:
        return {
          'label-home_default': true,
        };
    }
  }
}
