import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowItWorkVideoComponent } from './how-it-work-video.component';

describe('HowItWorkVideoComponent', () => {
  let component: HowItWorkVideoComponent;
  let fixture: ComponentFixture<HowItWorkVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowItWorkVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowItWorkVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
