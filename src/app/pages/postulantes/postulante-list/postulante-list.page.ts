import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
<<<<<<< HEAD
import { ConvocatoriaForTableDTO } from 'src/app/_DTO/convocatoriaForTableDTO';
import { ConvocatoriaService } from 'src/app/services/convocatoria.service';
=======
import { forkJoin } from 'rxjs';
>>>>>>> 19f958e0aa95efba11aeddb214ca0fe909043589
import { PostulanteService } from 'src/app/services/postulante.service';

@Component({
  selector: 'app-postulante-list',
  templateUrl: './postulante-list.page.html',
  styleUrls: ['./postulante-list.page.scss'],
})
export class PostulanteListPage implements OnInit {
  postulantes: any[] = [];
  convocatoriaId: number = 0;
  estado!: string;
<<<<<<< HEAD
  convocatoria!: ConvocatoriaForTableDTO;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private postulanteService: PostulanteService,
    private convocatoriaService: ConvocatoriaService
  ) {}
=======
  etapa!: string;
  constructor( private route: ActivatedRoute,
    private postulanteService: PostulanteService) { }
>>>>>>> 19f958e0aa95efba11aeddb214ca0fe909043589

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.convocatoriaId = params['id'];
      this.estado = params['estado'];
<<<<<<< HEAD
      console.log(this.convocatoriaId);
      this.loadConvocatoria();
    });
=======
      this.etapa = params['etapa'];
      console.log(this.convocatoriaId);
    })
    // this.convocatoriaId = +this.route.snapshot.paramMap.get('idConvocatoria')!;
    this.loadPostulantes();
  }

  loadPostulantes() {
    if (this.estado === 'Finalizado') {
      this.postulanteService.getPostulantesConEstado(this.convocatoriaId, 'Aceptado').subscribe((data: any) => {
        this.postulantes = data;
      });
    } else if (this.estado === 'En selección' && this.etapa === 'seleccionar') {
      forkJoin([
        this.postulanteService.getPostulantesConEstado(this.convocatoriaId, 'Aceptado'),
        this.postulanteService.getPostulantesConEstado(this.convocatoriaId, 'Preseleccionado')
      ]).subscribe((responses: any[]) => {
        this.postulantes = [...responses[0], ...responses[1]];
      });
    } else {
      this.postulanteService.getPostulantes(this.convocatoriaId).subscribe((data: any) => {
        this.postulantes = data;
      });
    }
>>>>>>> 19f958e0aa95efba11aeddb214ca0fe909043589
  }
  

  loadConvocatoria() {
    this.isLoading = true;
    this.convocatoriaService.obtenerConvocatoria(this.convocatoriaId).subscribe({
      next: (res) => {
        if (res && this.isConvocatoriaValid(res)) {
          this.convocatoria = res;
          this.isLoading = false;
          this.loadPostulantes();
        } else {
          console.log('Convocatoria no válida:', res);
          this.isLoading = false;
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.log('Error al cargar convocatoria:', error);
      },
    });
  }

  loadPostulantes() {
    if (this.convocatoria && this.convocatoria.id) {
      this.postulanteService.getPostulantes(this.convocatoriaId).subscribe((data: any) => {
        this.postulantes = data;
      });
    } else {
      console.log('Convocatoria no cargada correctamente');
    }
  }

  ionViewWillEnter() {
    if (!this.isLoading) {
      this.loadPostulantes();
    }
  }

  // Función para validar la estructura de la convocatoria
  private isConvocatoriaValid(convocatoria: any): convocatoria is ConvocatoriaForTableDTO {
    return (
      convocatoria &&
      typeof convocatoria.id === 'number' &&
      typeof convocatoria.titulo === 'string' &&
      typeof convocatoria.descripcion === 'string' &&
      typeof convocatoria.imagen === 'string' &&
      typeof convocatoria.cantidadMaxPost === 'number' &&
      typeof convocatoria.vigente === 'boolean' &&
      typeof convocatoria.fechaInicioReclutamiento === 'string' &&
      typeof convocatoria.fechaFinReclutamiento === 'string' &&
      typeof convocatoria.fechaInicioSeleccion === 'string' &&
      typeof convocatoria.fechaFinSeleccion === 'string' &&
      typeof convocatoria.estado === 'string' &&
      typeof convocatoria.empresa === 'number' &&
      typeof convocatoria.postulantes === 'number'
    );
  }
}
