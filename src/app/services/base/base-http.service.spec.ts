import { TestBed } from '@angular/core/testing';

import { BaseHttpService } from './base-http.service';

describe('BaseService', () => {
  let service: BaseHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
