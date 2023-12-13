import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonPropsComponent } from './json-props.component';

describe('JsonPropsComponent', () => {
  let component: JsonPropsComponent;
  let fixture: ComponentFixture<JsonPropsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JsonPropsComponent]
    });
    fixture = TestBed.createComponent(JsonPropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
