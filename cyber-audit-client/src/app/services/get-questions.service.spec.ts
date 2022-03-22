import { TestBed } from '@angular/core/testing';

import { GetQuestionsService } from './get-questions.service';

describe('GetQuestionsService', () => {
  let service: GetQuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetQuestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
