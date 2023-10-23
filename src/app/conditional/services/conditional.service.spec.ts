import { TestBed } from '@angular/core/testing';

import { ConditionalService } from './conditional.service';

describe('ConditionalService', () => {
  let service: ConditionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConditionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
