import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuddyComponent } from './muddy.component';
import { LocationService } from '../services/location.service';
import { WeatherService } from '../services/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { of } from 'rxjs';
import { WeatherModel } from '../models/weather.model';

describe('MuddyComponent', () => {
  let component: MuddyComponent;
  let fixture: ComponentFixture<MuddyComponent>;
  let locationService: LocationService;
  let weatherSpy;
  let locationSpy;
  let weatherService: WeatherService;
  const coordinates = {
    latitude: 'lat',
    longitude: 'long'
  };
  let weather: WeatherModel;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MuddyComponent],
      imports: [
        HttpClientModule,
        FontAwesomeModule
      ],
      providers: [LocationService, WeatherService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    weather = {
      daily: {
        data: []
      }
    };
    fixture = TestBed.createComponent(MuddyComponent);
    component = fixture.componentInstance;
    weatherService = fixture.debugElement.injector.get(WeatherService);
    locationService = fixture.debugElement.injector.get(LocationService);
    locationSpy = spyOn(locationService, 'getPosition').and.returnValue(Promise.resolve(coordinates));
  });

  describe('When the page loads', () => {
    beforeEach(async () => {
      weatherSpy = spyOn(weatherService, 'getWeather').and.returnValue(of(weather));
      fixture.detectChanges();
    });
    it('weather service should be called', () => {
      expect(weatherSpy).toHaveBeenCalledWith(coordinates.latitude, coordinates.longitude);
    });
    it('weather service should update weather', () => {
      expect(component.weather).toEqual(weather);
    });
    it('location service should be called', () => {
      expect(locationSpy).toHaveBeenCalled();
    });
  });

  describe(`When there's rain in the next 3 days`, () => {
    describe(`and it's above freezing`, () => {
      beforeEach(async () => {
        weather.daily.data = [
          {
            temperatureLow: 33,
            icon: 'rain'
          },
          {
            temperatureLow: 33,
            icon: 'rain'
          },
          {
            temperatureLow: 33,
            icon: 'rain'
          }
        ];
        weatherSpy = spyOn(weatherService, 'getWeather').and.returnValue(of(weather));
        fixture.detectChanges();
      });

      it('then muddy should be true', () => {
        expect(component.muddy).toBe(true);
      });

    });
    describe(`and it's below freezing`, () => {
      beforeEach(async () => {
        weather.daily.data = [
          {
            temperatureLow: 31,
            icon: 'rain'
          },
          {
            temperatureLow: 31,
            icon: 'rain'
          },
          {
            temperatureLow: 31,
            icon: 'rain'
          }
        ];
        weatherSpy = spyOn(weatherService, 'getWeather').and.returnValue(of(weather));
        fixture.detectChanges();
      });

      it('then muddy should be false', () => {
        expect(component.muddy).toBe(false);
      });
    });
  });

  describe(`When there isn't rain in the next 3 days`, () => {
    beforeEach(async () => {
      weather.daily.data = [
        {
          temperatureLow: 31,
          icon: ''
        },
        {
          temperatureLow: 31,
          icon: ''
        },
        {
          temperatureLow: 31,
          icon: ''
        }
      ];
      weatherSpy = spyOn(weatherService, 'getWeather').and.returnValue(of(weather));
      fixture.detectChanges();
    });

    it('then muddy should be false', () => {
      expect(component.muddy).toBe(false);
    });
  });

});
