import { TestBed } from '@angular/core/testing';

import { AreaHierarchyService } from './area-hierarchy.service';

describe('AreaHierarchyService', () => {
  let service: AreaHierarchyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaHierarchyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
