import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConvocatoriasPostuladasPage } from './convocatorias-postuladas.page';

describe('ConvocatoriasPostuladasPage', () => {
  let component: ConvocatoriasPostuladasPage;
  let fixture: ComponentFixture<ConvocatoriasPostuladasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvocatoriasPostuladasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
