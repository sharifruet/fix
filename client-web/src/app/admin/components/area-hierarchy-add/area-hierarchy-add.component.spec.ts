import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaHierarchyAddComponent } from './area-hierarchy-add.component';

describe('AreaHierarchyAddComponent', () => {
  let component: AreaHierarchyAddComponent;
  let fixture: ComponentFixture<AreaHierarchyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaHierarchyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaHierarchyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
