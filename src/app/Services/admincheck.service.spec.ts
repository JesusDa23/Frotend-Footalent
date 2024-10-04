import { TestBed } from '@angular/core/testing';

import { AdmincheckService } from './admincheck.service';

describe('AdmincheckService', () => {
  let service: AdmincheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmincheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
