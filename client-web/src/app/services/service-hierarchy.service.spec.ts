import { TestBed } from '@angular/core/testing';

import { ServiceHierarchyService } from './service-hierarchy.service';

describe('ServiceHierarchyService', () => {
  let service: ServiceHierarchyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceHierarchyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
