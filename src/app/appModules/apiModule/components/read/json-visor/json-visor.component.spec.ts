import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonVisorComponent } from './json-visor.component';

describe('JsonVisorComponent', () => {
  let component: JsonVisorComponent;
  let fixture: ComponentFixture<JsonVisorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JsonVisorComponent]
    });
    fixture = TestBed.createComponent(JsonVisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
