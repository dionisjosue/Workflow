import { TestBed } from '@angular/core/testing';

import { FieldOptionService } from './field-option.service';

describe('FieldOptionService', () => {
  let service: FieldOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldOptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
