import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbienteListagemComponent } from './ambiente-listagem.component';

describe('AmbienteListagemComponent', () => {
  let component: AmbienteListagemComponent;
  let fixture: ComponentFixture<AmbienteListagemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmbienteListagemComponent]
    });
    fixture = TestBed.createComponent(AmbienteListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
