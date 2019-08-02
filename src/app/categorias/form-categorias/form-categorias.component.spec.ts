import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCategoriasComponent } from './form-categorias.component';

describe('FormCategoriasComponent', () => {
  let component: FormCategoriasComponent;
  let fixture: ComponentFixture<FormCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
