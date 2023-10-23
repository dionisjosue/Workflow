import { TestBed } from '@angular/core/testing';

import { FieldTypeService } from './field-type.service';

describe('FieldTypeService', () => {
  let service: FieldTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
