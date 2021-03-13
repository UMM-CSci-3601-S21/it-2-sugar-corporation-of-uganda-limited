import { TestBed } from '@angular/core/testing';

import { ContextpackService } from './contextpack.service';

describe('ContextpackService', () => {
  let service: ContextpackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContextpackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
