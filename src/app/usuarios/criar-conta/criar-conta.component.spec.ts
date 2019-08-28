import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarContaComponent } from './criar-conta.component';

describe('CriarContaComponent', () => {
  let component: CriarContaComponent;
  let fixture: ComponentFixture<CriarContaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarContaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
