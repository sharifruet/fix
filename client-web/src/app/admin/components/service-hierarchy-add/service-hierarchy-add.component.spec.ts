import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceHierarchyAddComponent } from './service-hierarchy-add.component';

describe('ServiceHierarchyAddComponent', () => {
  let component: ServiceHierarchyAddComponent;
  let fixture: ComponentFixture<ServiceHierarchyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceHierarchyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceHierarchyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
