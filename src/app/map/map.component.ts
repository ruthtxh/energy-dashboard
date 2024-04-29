import { Component, OnInit, inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { WeatherLocationComponent } from '../weather-location/weather-location.component';
import { WeatherLocation } from '../weatherlocation';
import { WeatherService } from '../weather.service';
// Must import this before the modules
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { Control } from 'leaflet';
import LayersOptions = Control.LayersOptions;
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
	selector: 'markercluster-demo',
	standalone: true,
	imports: [LeafletModule,
		LeafletMarkerClusterModule, NgbModal],
	templateUrl: './map.component.html',

	encapsulation: ViewEncapsulation.None,
})

export class MapComponent implements OnInit {

	// Weather location info from service
	weatherLocationList: WeatherLocation[] = [];
	weatherService: WeatherService = inject(WeatherService);

	// Open Street Map Definition
	LAYER_OSM = {
		id: 'openstreetmap',
		name: 'Open Street Map',
		enabled: false,
		layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

			attribution: 'Open Street Map'
		}),
	};

	// Values to bind to Leaflet Directive
	layersControlOptions: LayersOptions = { position: 'bottomright' };
	baseLayers = {
		'Open Street Map': this.LAYER_OSM.layer
	};
	options = {
		zoom: 10,
		center: L.latLng(1.375, 103.839)
	};

	// Marker cluster stuff
	markerClusterGroup: L.MarkerClusterGroup = new L.MarkerClusterGroup();
	markerClusterData: L.Marker[] = [];
	markerClusterOptions: L.MarkerClusterGroupOptions = {};

	ngOnInit() {
		this.refreshData();
	}

	markerClusterReady(group: L.MarkerClusterGroup) {
		this.markerClusterGroup = group;
	}

	refreshData(): void {
		const data: L.Marker[] = [];
		this.weatherService.getAllWeatherLocations().then((weatherLocationList: WeatherLocation[]) => {
			this.weatherLocationList = weatherLocationList;
			this.weatherLocationList.forEach(el => {
				const newMarker = L.marker(
					[el.label_location.latitude, el.label_location.longitude],
					{
						icon: L.icon({
							iconSize: [25, 41],
							iconAnchor: [13, 41],
							iconUrl: 'leaflet/marker-icon.png',
							iconRetinaUrl: 'leaflet/marker-icon-2x.png',
							shadowUrl: 'leaflet/marker-shadow.png'
						})
					}
				)
				data.push(newMarker)
			})
			this.markerClusterData = data;
		});
	}
	private modalService = inject(NgbModal);
	openVerticallyCentered(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}
}