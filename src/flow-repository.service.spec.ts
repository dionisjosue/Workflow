import { TestBed } from '@angular/core/testing';

import { FlowRepositoryService } from './flow-repository.service';

describe('FlowRepositoryService', () => {
  let service: FlowRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
