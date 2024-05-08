import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoListagemComponent } from './servico-listagem.component';

describe('ServicoListagemComponent', () => {
  let component: ServicoListagemComponent;
  let fixture: ComponentFixture<ServicoListagemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicoListagemComponent]
    });
    fixture = TestBed.createComponent(ServicoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
