import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareWeatherComponent } from './compare-weather.component';

describe('CompareWeatherComponent', () => {
  let component: CompareWeatherComponent;
  let fixture: ComponentFixture<CompareWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
