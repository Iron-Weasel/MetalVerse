import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RockStreamsComponent } from './rock-streams.component';

describe('RockStreamsComponent', () => {
  let component: RockStreamsComponent;
  let fixture: ComponentFixture<RockStreamsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RockStreamsComponent]
    });
    fixture = TestBed.createComponent(RockStreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
