import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rutainexistente } from './rutainexistente';

describe('Rutainexistente', () => {
  let component: Rutainexistente;
  let fixture: ComponentFixture<Rutainexistente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rutainexistente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rutainexistente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
