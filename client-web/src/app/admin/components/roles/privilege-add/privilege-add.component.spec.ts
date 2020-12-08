import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegeAddComponent } from './privilege-add.component';

describe('PrivilegeAddComponent', () => {
  let component: PrivilegeAddComponent;
  let fixture: ComponentFixture<PrivilegeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivilegeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivilegeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
