import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetorCadastroComponent } from './setor-cadastro.component';

describe('SetorCadastroComponent', () => {
  let component: SetorCadastroComponent;
  let fixture: ComponentFixture<SetorCadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetorCadastroComponent]
    });
    fixture = TestBed.createComponent(SetorCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
