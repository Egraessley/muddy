import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { WeatherService } from './weather.service';
import { environment } from '../../environments/environment';

describe('WeatherService', () => {
  let httpTestingController: HttpTestingController;
  const url = `${environment.apiBaseUrl}muddy`;
  let service: WeatherService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [WeatherService],
    imports: [HttpClientTestingModule],
  }));

  beforeEach(() => {
    service = TestBed.get(WeatherService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getWeather', () => {
    it('should call GET with the correct URL', () => {
      service.getWeather('lat', 'long').subscribe();
      const req = httpTestingController.expectOne(`${url}/lat/long`);
      req.flush({});
      httpTestingController.verify();
      expect(req.request.method).toBe('GET');
    });
  });
});
