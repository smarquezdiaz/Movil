import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MostrarConvocatoriaPostulantePage } from './mostrar-convocatoria-postulante.page';

describe('MostrarConvocatoriaPostulantePage', () => {
  let component: MostrarConvocatoriaPostulantePage;
  let fixture: ComponentFixture<MostrarConvocatoriaPostulantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarConvocatoriaPostulantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
