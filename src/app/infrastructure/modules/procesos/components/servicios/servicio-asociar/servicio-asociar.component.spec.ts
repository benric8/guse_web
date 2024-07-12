import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioAsociarComponent } from './servicio-asociar.component';

describe('ServicioAsociarComponent', () => {
  let component: ServicioAsociarComponent;
  let fixture: ComponentFixture<ServicioAsociarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicioAsociarComponent]
    });
    fixture = TestBed.createComponent(ServicioAsociarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
