import { TestBed } from '@angular/core/testing';

import { CreateReportsService } from './create-reports.service';

describe('CreateReportsService', () => {
  let service: CreateReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
