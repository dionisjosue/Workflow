import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizerComponent } from './modal-visualizer.component';

describe('ModalVisualizerComponent', () => {
  let component: ModalVisualizerComponent;
  let fixture: ComponentFixture<ModalVisualizerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalVisualizerComponent]
    });
    fixture = TestBed.createComponent(ModalVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
