import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConvocatoriaForTableDTO } from 'src/app/modelos/convocatoria';
import { ConvocatoriaService } from 'src/app/services/convocatoria.service';
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
  convocatoria!: ConvocatoriaForTableDTO;

  constructor( private route: ActivatedRoute,
    private postulanteService: PostulanteService,
    private convocatoriaService: ConvocatoriaService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.convocatoriaId = params['id'];
      this.estado = params['estado'];
      console.log(this.convocatoriaId);
    })
    this.convocatoriaService.obtenerConvocatoria(this.convocatoriaId).subscribe({
      next: (res) => {
        this.convocatoria = res;
      },
      error: (error) => {
        console.log(error);
      }
    })
    this.loadPostulantes();
  }

  loadPostulantes() {
    this.postulanteService.getPostulantes(this.convocatoriaId).subscribe((data: any) => {
      this.postulantes = data;
    });
  }

  ionViewWillEnter() {
    this.loadPostulantes();
  }

}
