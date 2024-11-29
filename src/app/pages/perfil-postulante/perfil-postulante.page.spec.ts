import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPostulantePage } from './perfil-postulante.page';

describe('PerfilPostulantePage', () => {
  let component: PerfilPostulantePage;
  let fixture: ComponentFixture<PerfilPostulantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilPostulantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
