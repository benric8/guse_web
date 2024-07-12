import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadDetalleComponent } from './entidad-detalle.component';

describe('EntidadDetalleComponent', () => {
  let component: EntidadDetalleComponent;
  let fixture: ComponentFixture<EntidadDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntidadDetalleComponent]
    });
    fixture = TestBed.createComponent(EntidadDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
