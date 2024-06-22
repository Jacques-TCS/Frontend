import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaFuncionariosChartComponent } from './meta-funcionarios-chart.component';

describe('MetaFuncionariosChartComponent', () => {
  let component: MetaFuncionariosChartComponent;
  let fixture: ComponentFixture<MetaFuncionariosChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetaFuncionariosChartComponent]
    });
    fixture = TestBed.createComponent(MetaFuncionariosChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
