import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpindelSensorComponent } from './spindel-sensor.component';

describe('SpindelSensorComponent', () => {
  let component: SpindelSensorComponent;
  let fixture: ComponentFixture<SpindelSensorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpindelSensorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpindelSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
