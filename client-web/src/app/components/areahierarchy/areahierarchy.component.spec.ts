import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreahierarchyComponent } from './areahierarchy.component';

describe('AreahierarchyComponent', () => {
  let component: AreahierarchyComponent;
  let fixture: ComponentFixture<AreahierarchyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreahierarchyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreahierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
