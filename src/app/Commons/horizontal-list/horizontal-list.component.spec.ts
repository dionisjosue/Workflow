import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalListComponent } from './horizontal-list.component';

describe('HorizontalListComponent', () => {
  let component: HorizontalListComponent;
  let fixture: ComponentFixture<HorizontalListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorizontalListComponent]
    });
    fixture = TestBed.createComponent(HorizontalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
