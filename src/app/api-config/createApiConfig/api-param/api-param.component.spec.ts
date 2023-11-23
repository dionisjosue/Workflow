import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiParamComponent } from './api-param.component';

describe('ApiParamComponent', () => {
  let component: ApiParamComponent;
  let fixture: ComponentFixture<ApiParamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiParamComponent]
    });
    fixture = TestBed.createComponent(ApiParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
