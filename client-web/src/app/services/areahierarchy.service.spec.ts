import { TestBed } from '@angular/core/testing';

import { AreahierarchyService } from './areahierarchy.service';

describe('AreahierarchyService', () => {
  let service: AreahierarchyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreahierarchyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
