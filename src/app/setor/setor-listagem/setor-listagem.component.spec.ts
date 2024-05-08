import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetorListagemComponent } from './setor-listagem.component';

describe('SetorListagemComponent', () => {
  let component: SetorListagemComponent;
  let fixture: ComponentFixture<SetorListagemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetorListagemComponent]
    });
    fixture = TestBed.createComponent(SetorListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
