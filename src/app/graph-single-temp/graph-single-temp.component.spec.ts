import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphSingleTempComponent } from './graph-single-temp.component';

describe('GraphSingleTempComponent', () => {
  let component: GraphSingleTempComponent;
  let fixture: ComponentFixture<GraphSingleTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphSingleTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphSingleTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
