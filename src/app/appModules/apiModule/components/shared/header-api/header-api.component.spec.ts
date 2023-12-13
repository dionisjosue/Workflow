import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderApiComponent } from './header-api.component';

describe('HeaderApiComponent', () => {
  let component: HeaderApiComponent;
  let fixture: ComponentFixture<HeaderApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderApiComponent]
    });
    fixture = TestBed.createComponent(HeaderApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
