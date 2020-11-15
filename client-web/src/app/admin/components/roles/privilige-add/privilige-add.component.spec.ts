import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriviligeAddComponent } from './privilige-add.component';

describe('PriviligeAddComponent', () => {
  let component: PriviligeAddComponent;
  let fixture: ComponentFixture<PriviligeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriviligeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriviligeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
