import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbienteCadastroComponent } from './ambiente-cadastro.component';

describe('AmbienteCadastroComponent', () => {
  let component: AmbienteCadastroComponent;
  let fixture: ComponentFixture<AmbienteCadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmbienteCadastroComponent]
    });
    fixture = TestBed.createComponent(AmbienteCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
