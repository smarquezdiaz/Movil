import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MostrarPostulantePage } from './mostrar-postulante.page';

describe('MostrarPostulantePage', () => {
  let component: MostrarPostulantePage;
  let fixture: ComponentFixture<MostrarPostulantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarPostulantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
