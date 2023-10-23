import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionalComponent } from './createConditional.component';

describe('ConditionalComponent', () => {
  let component: ConditionalComponent;
  let fixture: ComponentFixture<ConditionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConditionalComponent]
    });
    fixture = TestBed.createComponent(ConditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
