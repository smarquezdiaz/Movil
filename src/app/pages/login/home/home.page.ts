import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { ConvocatoriaForTableDTO, ConvocatoriaInfo } from 'src/app/modelos/convocatoria';
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
  list!: ConvocatoriaForTableDTO[];
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
    this.cargarConvocatorias();
  }
  cargarConvocatorias() {
    this.userId = this.utilsService.getFromLocalStorage('userId');
    this.empresaService.obtenerConvocatorias(this.userId, "").subscribe({
      next: (res) => {
        this.list = res;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  handleChange(e:any) {
    // llamar convocatoria con estado
    if( e.detail.value) {
      console.log('esto: ' + e.detail.value);
      this.userId = this.utilsService.getFromLocalStorage('userId');
      this.empresaService.obtenerConvocatoriasPorEstado(this.userId, e.detail.value).subscribe({
        next: (res) => {
          this.list = res;
        },
        error: (error) => {
          console.log(error);
        }
      })
    } else {
      console.log('sin estado: ' + e.detail.value);
      this.cargarConvocatorias();
    }
  }

  mostrarConvocatoria(id: string) {
    this.router.navigate(['/home/mostrar-convocatoria',id]);
  }

  changeColor(estado: string){
    switch(estado) {
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