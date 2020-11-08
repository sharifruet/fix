import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemPaymentComponent } from './order-item-payment.component';

describe('OrderItemPaymentComponent', () => {
  let component: OrderItemPaymentComponent;
  let fixture: ComponentFixture<OrderItemPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderItemPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
