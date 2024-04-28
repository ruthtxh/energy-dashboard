import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherLocationComponent } from '../weather-location/weather-location.component';
import { WeatherLocation } from '../weatherlocation';
import { WeatherService } from '../weather.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { latLng, LatLng, tileLayer, marker, icon, Layer } from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, WeatherLocationComponent, LeafletModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  weatherLocationList: WeatherLocation[] = [];
  weatherService: WeatherService = inject(WeatherService);
  layers: Layer[] = [];
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 10,
    center: latLng(1.375, 103.839)
  };
  constructor() {
    this.weatherService.getAllWeatherLocations().then((weatherLocationList: WeatherLocation[]) => {
      this.weatherLocationList = weatherLocationList;
      this.weatherLocationList.forEach(el => {
        const newMarker = marker(
          [el.label_location.latitude, el.label_location.longitude],
          {
            icon: icon({
              iconSize: [25, 41],
              iconAnchor: [13, 41],
              iconUrl: 'leaflet/marker-icon.png',
              iconRetinaUrl: 'leaflet/marker-icon-2x.png',
              shadowUrl: 'leaflet/marker-shadow.png'
            })
          }
        )
        this.layers.push(newMarker)
      })
    });

  }
}