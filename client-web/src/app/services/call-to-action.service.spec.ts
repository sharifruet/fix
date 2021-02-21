import { TestBed } from '@angular/core/testing';

import { CallToActionService } from './call-to-action.service';

describe('CallToActionService', () => {
  let service: CallToActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallToActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
