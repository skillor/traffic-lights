import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficCardComponent } from './traffic-card.component';

describe('TrafficCardComponent', () => {
  let component: TrafficCardComponent;
  let fixture: ComponentFixture<TrafficCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrafficCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrafficCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
