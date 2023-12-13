import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationApiComponent } from './authentication-api.component';

describe('AuthenticationApiComponent', () => {
  let component: AuthenticationApiComponent;
  let fixture: ComponentFixture<AuthenticationApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticationApiComponent]
    });
    fixture = TestBed.createComponent(AuthenticationApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
