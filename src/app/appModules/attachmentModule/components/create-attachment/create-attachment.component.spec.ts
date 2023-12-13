import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAttachmentComponent } from './create-attachment.component';

describe('CreateAttachmentComponent', () => {
  let component: CreateAttachmentComponent;
  let fixture: ComponentFixture<CreateAttachmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAttachmentComponent]
    });
    fixture = TestBed.createComponent(CreateAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
