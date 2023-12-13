import { TestBed } from '@angular/core/testing';

import { ShareDataComplexService } from './share-data-complex.service';

describe('ShareDataComplexService', () => {
  let service: ShareDataComplexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareDataComplexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
