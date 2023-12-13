import { TestBed } from '@angular/core/testing';

import { AttachmentStepService } from './attachment-step.service';

describe('AttachmentStepService', () => {
  let service: AttachmentStepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttachmentStepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
