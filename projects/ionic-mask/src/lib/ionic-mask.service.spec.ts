import { TestBed } from '@angular/core/testing';

import { IonicMaskService } from './ionic-mask.service';

describe('IonicMaskService', () => {
  let service: IonicMaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IonicMaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
