import { TestBed } from '@angular/core/testing';

import { SelfDescriptionService } from './self-description.service';

describe('SelfDescriptionService', () => {
  let service: SelfDescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelfDescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
