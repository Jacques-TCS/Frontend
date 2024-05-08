import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronogramaCadastroComponent } from './cronograma-cadastro.component';

describe('CronogramaCadastroComponent', () => {
  let component: CronogramaCadastroComponent;
  let fixture: ComponentFixture<CronogramaCadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CronogramaCadastroComponent]
    });
    fixture = TestBed.createComponent(CronogramaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
