import { TestBed } from '@angular/core/testing';

import { AplicativosService } from './aplicativos.service';

describe('AplicativosService', () => {
  let service: AplicativosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AplicativosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
