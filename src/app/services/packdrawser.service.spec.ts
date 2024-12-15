import { TestBed } from '@angular/core/testing';

import { PackdrawserService } from './packdrawser.service';

describe('PackdrawserService', () => {
  let service: PackdrawserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackdrawserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
