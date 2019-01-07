import { TestBed } from '@angular/core/testing';

import { SpotifyRgService } from './spotify-rg.service';

describe('SpotifyServiceRgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpotifyRgService = TestBed.get(SpotifyRgService);
    expect(service).toBeTruthy();
  });
});
