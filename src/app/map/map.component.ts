import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherLocationComponent } from '../weather-location/weather-location.component';
import { WeatherLocation } from '../weatherlocation';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, WeatherLocationComponent],
  template: `
  <section>
  <form>
    <input type="text" placeholder="Filter by city" />
    <button class="primary" type="button">Search</button>
  </form>
</section>
<section class="results">
  <app-weather-location *ngFor="let weatherLocation of weatherLocationList"
  [weatherLocation]="weatherLocation"></app-weather-location>
</section>
  `,
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  weatherLocationList: WeatherLocation[] = [];
  weatherService: WeatherService = inject(WeatherService);
  constructor() {
    this.weatherService.getAllWeatherLocations().then((weatherLocationList: WeatherLocation[]) => {
      this.weatherLocationList = weatherLocationList;
    });
  }
}

