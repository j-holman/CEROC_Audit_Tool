import { TestBed } from '@angular/core/testing';

import { PostReportService } from './post-report.service';

describe('PostReportService', () => {
  let service: PostReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
