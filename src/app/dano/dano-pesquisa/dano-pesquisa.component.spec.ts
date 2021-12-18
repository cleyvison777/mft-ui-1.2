import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanoPesquisaComponent } from './dano-pesquisa.component';

describe('DanoPesquisaComponent', () => {
  let component: DanoPesquisaComponent;
  let fixture: ComponentFixture<DanoPesquisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanoPesquisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanoPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
