import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMetricsComponent } from './list-metrics.component';

describe('ListMetricsComponent', () => {
  let component: ListMetricsComponent;
  let fixture: ComponentFixture<ListMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMetricsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
