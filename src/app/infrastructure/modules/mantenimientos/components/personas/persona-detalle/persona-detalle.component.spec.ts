import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaDetalleComponent } from './persona-detalle.component';

describe('PersonaDetalleComponent', () => {
  let component: PersonaDetalleComponent;
  let fixture: ComponentFixture<PersonaDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonaDetalleComponent]
    });
    fixture = TestBed.createComponent(PersonaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
