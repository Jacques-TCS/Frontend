import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronogramaListagemConcorrenteComponent } from './cronograma-listagem-concorrente.component';

describe('CronogramaListagemConcorrenteComponent', () => {
  let component: CronogramaListagemConcorrenteComponent;
  let fixture: ComponentFixture<CronogramaListagemConcorrenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CronogramaListagemConcorrenteComponent]
    });
    fixture = TestBed.createComponent(CronogramaListagemConcorrenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
