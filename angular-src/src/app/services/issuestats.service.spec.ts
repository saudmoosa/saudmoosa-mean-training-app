import { TestBed } from '@angular/core/testing';

import { IssuestatsService } from './issuestats.service';

describe('IssuestatsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IssuestatsService = TestBed.get(IssuestatsService);
    expect(service).toBeTruthy();
  });
});
