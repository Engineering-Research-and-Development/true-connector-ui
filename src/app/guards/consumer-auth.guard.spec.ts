import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { consumerAuthGuard } from './consumer-auth.guard';

describe('consumerAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => consumerAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
