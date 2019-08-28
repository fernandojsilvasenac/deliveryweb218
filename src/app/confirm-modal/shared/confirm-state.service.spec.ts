import { TestBed } from '@angular/core/testing';

import { ConfirmStateService } from './confirm-state.service';

describe('ConfirmStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfirmStateService = TestBed.get(ConfirmStateService);
    expect(service).toBeTruthy();
  });
});
