import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeruiComponent } from './customerui.component';

describe('CustomeruiComponent', () => {
  let component: CustomeruiComponent;
  let fixture: ComponentFixture<CustomeruiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomeruiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomeruiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
