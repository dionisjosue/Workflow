import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionalApiComponent } from './conditional-api.component';

describe('ConditionalApiComponent', () => {
  let component: ConditionalApiComponent;
  let fixture: ComponentFixture<ConditionalApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConditionalApiComponent]
    });
    fixture = TestBed.createComponent(ConditionalApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
