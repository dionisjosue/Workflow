import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateApiConfigComponent } from './create-api-config.component';

describe('CreateApiConfigComponent', () => {
  let component: CreateApiConfigComponent;
  let fixture: ComponentFixture<CreateApiConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateApiConfigComponent]
    });
    fixture = TestBed.createComponent(CreateApiConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
