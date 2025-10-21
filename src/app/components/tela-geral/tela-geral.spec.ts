import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaGeral } from './tela-geral';

describe('TelaGeral', () => {
  let component: TelaGeral;
  let fixture: ComponentFixture<TelaGeral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaGeral]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaGeral);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
