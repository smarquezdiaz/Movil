import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostulanteListPage } from './postulante-list.page';

describe('PostulanteListPage', () => {
  let component: PostulanteListPage;
  let fixture: ComponentFixture<PostulanteListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulanteListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
