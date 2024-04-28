import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherLocation } from '../weatherlocation';

@Component({
  selector: 'app-weather-location',
  standalone: true,
  imports: [CommonModule],
  template: `
  <section class="listing">
  <h2 class="listing-heading">{{ weatherLocation.name }}</h2>
  <p class="listing-location">{{ weatherLocation.label_location.latitude }}, {{ weatherLocation.label_location.longitude }}</p>
</section>
  `,
  styleUrls: ['./weather-location.component.css'],
})
export class WeatherLocationComponent {
  @Input() weatherLocation!: WeatherLocation;
}
