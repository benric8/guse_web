import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicativoDetalleComponent } from './aplicativo-detalle.component';

describe('AplicativoDetalleComponent', () => {
  let component: AplicativoDetalleComponent;
  let fixture: ComponentFixture<AplicativoDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AplicativoDetalleComponent]
    });
    fixture = TestBed.createComponent(AplicativoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
