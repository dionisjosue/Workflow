import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSelectGenericComponent } from './ng-select-generic.component';

describe('NgSelectGenericComponent', () => {
  let component: NgSelectGenericComponent<any>;
  let fixture: ComponentFixture<NgSelectGenericComponent<any>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgSelectGenericComponent]
    });
    fixture = TestBed.createComponent(NgSelectGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
