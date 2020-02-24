import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherModel } from '../models/weather.model';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(lattitude: string | number, longitude: string | number): Observable<WeatherModel> {
    return this.http.get<WeatherModel>(`${environment.apiBaseUrl}muddy/${lattitude}/${longitude}`);
  }
}
