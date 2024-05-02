import { Component, Input, OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { latLng, LatLng, tileLayer, marker, icon, Layer } from 'leaflet';

@Component({
  selector: 'app-mini-map',
  standalone: true,
  imports: [LeafletModule],
  template: `
    <div style="height:250px;" leaflet [leafletOptions]="options">
  `
})

export class MiniMapComponent implements OnInit {
  @Input() lat?: number;
  @Input() long?: number;
  options: any = {};
  ngOnInit() {
    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 13,
      center: latLng(this.lat ?? 0, this.long ?? 0)
    };
  }
}