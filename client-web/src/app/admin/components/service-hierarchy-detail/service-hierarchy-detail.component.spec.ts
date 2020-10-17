import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceHierarchyDetailComponent } from './service-hierarchy-detail.component';

describe('ServiceHierarchyDetailComponent', () => {
  let component: ServiceHierarchyDetailComponent;
  let fixture: ComponentFixture<ServiceHierarchyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceHierarchyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceHierarchyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
