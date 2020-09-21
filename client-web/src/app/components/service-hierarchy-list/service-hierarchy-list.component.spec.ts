import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceHierarchyListComponent } from './service-hierarchy-list.component';

describe('ServiceHierarchyListComponent', () => {
  let component: ServiceHierarchyListComponent;
  let fixture: ComponentFixture<ServiceHierarchyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceHierarchyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceHierarchyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
