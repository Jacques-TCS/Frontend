import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronogramaListagemComponent } from './cronograma-listagem.component';

describe('CronogramaListagemComponent', () => {
  let component: CronogramaListagemComponent;
  let fixture: ComponentFixture<CronogramaListagemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CronogramaListagemComponent]
    });
    fixture = TestBed.createComponent(CronogramaListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
