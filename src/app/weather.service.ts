import { Injectable } from '@angular/core';
import { WeatherLocation } from './weatherlocation';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor() { }
  url = 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast/';

  async getAllWeatherLocations(): Promise<WeatherLocation[]> {
    const data = await fetch(this.url);
    const dataJSON = await data.json();
    return (await dataJSON["area_metadata"]) ?? [];
  }
  // getHousingLocationById(id: number): WeatherLocation | undefined {
  //   return this.weatherLocationList.find((weatherLocation) => weatherLocation.id === id);
  // }
}
