import { TestBed } from '@angular/core/testing';

import { ApiConditionalService } from './api-conditional.service';

describe('ApiConditionalService', () => {
  let service: ApiConditionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiConditionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
