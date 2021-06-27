import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsPopupComponent } from './elements-popup.component';

describe('ElementsPopupComponent', () => {
  let component: ElementsPopupComponent;
  let fixture: ComponentFixture<ElementsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
