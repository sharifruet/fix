import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaHierarchyDetailComponent } from './area-hierarchy-detail.component';

describe('AreaHierarchyDetailComponent', () => {
  let component: AreaHierarchyDetailComponent;
  let fixture: ComponentFixture<AreaHierarchyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaHierarchyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaHierarchyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
