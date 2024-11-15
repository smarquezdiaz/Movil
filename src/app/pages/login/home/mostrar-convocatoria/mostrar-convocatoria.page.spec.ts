import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MostrarConvocatoriaPage } from './mostrar-convocatoria.page';

describe('MostrarConvocatoriaPage', () => {
  let component: MostrarConvocatoriaPage;
  let fixture: ComponentFixture<MostrarConvocatoriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarConvocatoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
