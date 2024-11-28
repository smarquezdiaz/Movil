import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPostulantePage } from './register-postulante.page';

describe('RegisterPostulantePage', () => {
  let component: RegisterPostulantePage;
  let fixture: ComponentFixture<RegisterPostulantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPostulantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
