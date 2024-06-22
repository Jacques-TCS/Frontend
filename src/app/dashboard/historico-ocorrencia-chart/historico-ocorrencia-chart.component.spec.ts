import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoOcorrenciaChartComponent } from './historico-ocorrencia-chart.component';

describe('HistoricoOcorrenciaChartComponent', () => {
  let component: HistoricoOcorrenciaChartComponent;
  let fixture: ComponentFixture<HistoricoOcorrenciaChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricoOcorrenciaChartComponent]
    });
    fixture = TestBed.createComponent(HistoricoOcorrenciaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
