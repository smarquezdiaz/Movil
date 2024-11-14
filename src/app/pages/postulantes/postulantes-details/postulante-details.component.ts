import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostulanteService } from '../../services/postulante.service';

@Component({
  selector: 'app-postulante-detail',
  templateUrl: './postulante-detail.component.html',
  styleUrls: ['./postulante-detail.component.scss']
})
export class PostulanteDetailComponent implements OnInit {
  postulante: any;

  constructor(
    private route: ActivatedRoute,
    private postulanteService: PostulanteService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.postulanteService.getPostulantes(id).subscribe((data: any) => {
      this.postulante = data;
    });
  }
}
