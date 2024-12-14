import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
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
  etapa!: string;
  constructor( private route: ActivatedRoute,
    private postulanteService: PostulanteService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.convocatoriaId = params['id'];
      this.estado = params['estado'];
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
  }
  

  ionViewWillEnter() {
    this.loadPostulantes();
  }

}
