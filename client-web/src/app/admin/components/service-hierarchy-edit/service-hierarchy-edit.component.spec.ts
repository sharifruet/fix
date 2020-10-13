import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceHierarchyEditComponent } from './service-hierarchy-edit.component';

describe('ServiceHierarchyEditComponent', () => {
  let component: ServiceHierarchyEditComponent;
  let fixture: ComponentFixture<ServiceHierarchyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceHierarchyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceHierarchyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
