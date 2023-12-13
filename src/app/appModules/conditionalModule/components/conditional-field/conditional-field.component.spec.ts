import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionalFieldComponent } from './conditional-field.component';

describe('ConditionalFieldComponent', () => {
  let component: ConditionalFieldComponent;
  let fixture: ComponentFixture<ConditionalFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConditionalFieldComponent]
    });
    fixture = TestBed.createComponent(ConditionalFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
