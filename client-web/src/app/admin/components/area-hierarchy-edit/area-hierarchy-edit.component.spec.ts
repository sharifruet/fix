import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaHierarchyEditComponent } from './area-hierarchy-edit.component';

describe('AreaHierarchyEditComponent', () => {
  let component: AreaHierarchyEditComponent;
  let fixture: ComponentFixture<AreaHierarchyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaHierarchyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaHierarchyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
