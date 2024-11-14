import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostulanteService } from '../../services/postulante.service';

@Component({
  selector: 'app-postulantes-list',
  templateUrl: './postulantes-list.component.html',
  styleUrls: ['./postulantes-list.component.scss']
})
export class PostulantesListComponent implements OnInit {
  postulantes: any[] = [];
  convocatoriaId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private postulanteService: PostulanteService
  ) {}

  ngOnInit() {
    this.convocatoriaId = +this.route.snapshot.paramMap.get('idConvocatoria')!;
    this.loadPostulantes();
  }

  loadPostulantes() {
    this.postulanteService.getPostulantes(this.convocatoriaId).subscribe((data: any) => {
      this.postulantes = data;
    });
  }
}
