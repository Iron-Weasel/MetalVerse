import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureEventsComponent } from './future-events.component';

describe('FutureEventsComponent', () => {
  let component: FutureEventsComponent;
  let fixture: ComponentFixture<FutureEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FutureEventsComponent]
    });
    fixture = TestBed.createComponent(FutureEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
