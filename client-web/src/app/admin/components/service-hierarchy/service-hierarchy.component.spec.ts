import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceHierarchyComponent } from './service-hierarchy.component';

describe('ServiceHierarchyComponent', () => {
  let component: ServiceHierarchyComponent;
  let fixture: ComponentFixture<ServiceHierarchyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceHierarchyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
