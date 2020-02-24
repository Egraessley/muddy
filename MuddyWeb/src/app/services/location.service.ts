import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getPosition(): Promise<Coordinates> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {
          resolve(resp.coords);
        },
        err => {
          reject(err);
        });
    });
  }
}
