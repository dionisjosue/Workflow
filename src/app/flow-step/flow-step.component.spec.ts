import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowStepComponent } from './flow-step.component';

describe('FlowStepComponent', () => {
  let component: FlowStepComponent;
  let fixture: ComponentFixture<FlowStepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlowStepComponent]
    });
    fixture = TestBed.createComponent(FlowStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
