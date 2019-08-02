import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCategoriasComponent } from './lista-categorias.component';

describe('ListaCategoriasComponent', () => {
  let component: ListaCategoriasComponent;
  let fixture: ComponentFixture<ListaCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
