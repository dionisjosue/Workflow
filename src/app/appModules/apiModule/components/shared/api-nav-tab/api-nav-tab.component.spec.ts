import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiNavTabComponent } from './api-nav-tab.component';

describe('ApiNavTabComponent', () => {
  let component: ApiNavTabComponent;
  let fixture: ComponentFixture<ApiNavTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiNavTabComponent]
    });
    fixture = TestBed.createComponent(ApiNavTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
