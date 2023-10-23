import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiConfigComponent } from './api-config.component';

describe('ApiConfigComponent', () => {
  let component: ApiConfigComponent;
  let fixture: ComponentFixture<ApiConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiConfigComponent]
    });
    fixture = TestBed.createComponent(ApiConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
