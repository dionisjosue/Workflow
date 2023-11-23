import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiBodyComponent } from './api-body.component';

describe('ApiBodyComponent', () => {
  let component: ApiBodyComponent;
  let fixture: ComponentFixture<ApiBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiBodyComponent]
    });
    fixture = TestBed.createComponent(ApiBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
