import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceHierarchyComponent } from './add-service-hierarchy.component';

describe('AddServiceHierarchyComponent', () => {
  let component: AddServiceHierarchyComponent;
  let fixture: ComponentFixture<AddServiceHierarchyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddServiceHierarchyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServiceHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
