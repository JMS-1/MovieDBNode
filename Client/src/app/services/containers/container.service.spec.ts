import { TestBed } from '@angular/core/testing';

import { ContainersService } from './container.service';

describe('ContainersService', () => {
  let service: ContainersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContainersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
