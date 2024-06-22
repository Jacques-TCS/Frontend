import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronogramaListagemTerminalComponent } from './cronograma-listagem-terminal.component';

describe('CronogramaListagemTerminalComponent', () => {
  let component: CronogramaListagemTerminalComponent;
  let fixture: ComponentFixture<CronogramaListagemTerminalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CronogramaListagemTerminalComponent]
    });
    fixture = TestBed.createComponent(CronogramaListagemTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
