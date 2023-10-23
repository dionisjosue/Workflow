import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldTypeComponent } from './field-type.component';

describe('FieldTypeComponent', () => {
  let component: FieldTypeComponent;
  let fixture: ComponentFixture<FieldTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FieldTypeComponent]
    });
    fixture = TestBed.createComponent(FieldTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
