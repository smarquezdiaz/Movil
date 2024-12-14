
import { Component, Input } from '@angular/core';
import { Convocatoria } from '../../../models/empresa.model';

@Component({
  selector: 'app-convocatoria-card',
  templateUrl: './convocatoria-card.component.html',
  styleUrls: ['./convocatoria-card.component.scss']
})
export class ConvocatoriaCardComponent {
  @Input() convocatoria!: Convocatoria;
}
