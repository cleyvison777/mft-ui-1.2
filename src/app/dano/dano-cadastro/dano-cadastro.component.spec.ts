import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanoCadastroComponent } from './dano-cadastro.component';

describe('DanoCadastroComponent', () => {
  let component: DanoCadastroComponent;
  let fixture: ComponentFixture<DanoCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
