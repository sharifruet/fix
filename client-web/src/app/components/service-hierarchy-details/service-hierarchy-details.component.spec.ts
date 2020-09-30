import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceHierarchyDetailsComponent } from './service-hierarchy-details.component';

describe('ServiceHierarchyDetailsComponent', () => {
  let component: ServiceHierarchyDetailsComponent;
  let fixture: ComponentFixture<ServiceHierarchyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceHierarchyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceHierarchyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
