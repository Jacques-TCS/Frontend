import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressoLimpezaFuncionarioChartComponent } from './progresso-limpeza-funcionario-chart.component';

describe('ProgressoLimpezaFuncionarioChartComponent', () => {
  let component: ProgressoLimpezaFuncionarioChartComponent;
  let fixture: ComponentFixture<ProgressoLimpezaFuncionarioChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressoLimpezaFuncionarioChartComponent]
    });
    fixture = TestBed.createComponent(ProgressoLimpezaFuncionarioChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
