import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailApiConfigComponent } from './detail-api-config.component';

describe('DetailApiConfigComponent', () => {
  let component: DetailApiConfigComponent;
  let fixture: ComponentFixture<DetailApiConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailApiConfigComponent]
    });
    fixture = TestBed.createComponent(DetailApiConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
