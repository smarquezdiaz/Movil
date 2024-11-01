import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterConvocatoriaPage } from './register-convocatoria.page';

describe('RegisterConvocatoriaPage', () => {
  let component: RegisterConvocatoriaPage;
  let fixture: ComponentFixture<RegisterConvocatoriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterConvocatoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
