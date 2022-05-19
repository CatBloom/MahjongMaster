import { TestBed } from '@angular/core/testing';

import { MockWebApiService } from './mock-web-api.service';

describe('MockWebApiService', () => {
  let service: MockWebApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockWebApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
