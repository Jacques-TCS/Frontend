import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressoLimpezaChartComponent } from './progresso-limpeza-chart.component';

describe('ProgressoLimpezaChartComponent', () => {
  let component: ProgressoLimpezaChartComponent;
  let fixture: ComponentFixture<ProgressoLimpezaChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressoLimpezaChartComponent]
    });
    fixture = TestBed.createComponent(ProgressoLimpezaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
