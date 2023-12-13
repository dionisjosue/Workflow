import { TestBed } from '@angular/core/testing';

import { PropertyInfoService } from './property-info.service';

describe('PropertyInfoService', () => {
  let service: PropertyInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
