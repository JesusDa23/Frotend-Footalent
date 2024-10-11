import { TestBed } from '@angular/core/testing';

import { ReportarIncidenteService } from './reportar-incidente.service';

describe('ReportarIncidenteService', () => {
  let service: ReportarIncidenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportarIncidenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
