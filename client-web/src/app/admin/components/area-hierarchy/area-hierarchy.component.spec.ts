import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaHierarchyComponent } from './area-hierarchy.component';

describe('AreaHierarchyComponent', () => {
  let component: AreaHierarchyComponent;
  let fixture: ComponentFixture<AreaHierarchyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaHierarchyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
