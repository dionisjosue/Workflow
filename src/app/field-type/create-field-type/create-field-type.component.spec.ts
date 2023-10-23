import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFieldTypeComponent } from './create-field-type.component';

describe('CreateFieldTypeComponent', () => {
  let component: CreateFieldTypeComponent;
  let fixture: ComponentFixture<CreateFieldTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateFieldTypeComponent]
    });
    fixture = TestBed.createComponent(CreateFieldTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
