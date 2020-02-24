import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { WeatherService } from '../services/weather.service';
import { WeatherModel } from '../models/weather.model';
import { tap } from 'rxjs/operators';
import { faFrown, faSmile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-muddy',
  templateUrl: './muddy.component.html',
  styleUrls: ['./muddy.component.scss']
})
export class MuddyComponent implements OnInit {
  weather: WeatherModel;

  faFrown = faFrown;
  faSmile = faSmile;

  constructor(private locationService: LocationService, private weatherService: WeatherService) { }

  ngOnInit() {
    this.locationService.getPosition().then(coordinates => {
      this.weatherService.getWeather(coordinates.latitude, coordinates.longitude).pipe(
        tap(weather => this.weather = weather)
      ).subscribe();
    });
  }

  get muddy(): boolean {
    const rainy = this.weather.daily.data.filter((x, index) => index < 3).some(daily => daily.icon === 'rain');
    return rainy
      && this.weather.daily.data.length > 2
      && this.weather.daily.data[2].temperatureLow > 32;

  }

}
