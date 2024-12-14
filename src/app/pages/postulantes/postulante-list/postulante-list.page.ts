import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostulanteService } from 'src/app/services/postulante.service';

@Component({
  selector: 'app-postulante-list',
  templateUrl: './postulante-list.page.html',
  styleUrls: ['./postulante-list.page.scss'],
})
export class PostulanteListPage implements OnInit {
  postulantes: any[] = [];
  convocatoriaId: number = 0;
  convocatoria: any;

  constructor( private route: ActivatedRoute,
    private postulanteService: PostulanteService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.convocatoriaId = params['id'];
      console.log(this.convocatoriaId);
    })
    // this.convocatoriaId = +this.route.snapshot.paramMap.get('idConvocatoria')!;
    this.loadPostulantes();
    this.loadConvocatoria();
  }

  loadConvocatoria() {
    this.postulanteService.getConvocatoriaPorId(this.convocatoriaId).subscribe((data: any) => {
      this.convocatoria = data; 
      console.log('Detalles de la convocatoria:', this.convocatoria);
    });
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
