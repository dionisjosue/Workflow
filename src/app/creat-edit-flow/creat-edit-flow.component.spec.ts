import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatEditFlowComponent } from './creat-edit-flow.component';

describe('CreatEditFlowComponent', () => {
  let component: CreatEditFlowComponent;
  let fixture: ComponentFixture<CreatEditFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatEditFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatEditFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
