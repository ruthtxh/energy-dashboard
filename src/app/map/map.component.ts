import { Component, OnInit, inject, ViewEncapsulation, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherLocation } from '../weatherlocation';
import { WeatherService } from '../weather.service';
// Must import this before the modules
import * as L from 'leaflet';
import { Control, MarkerClusterGroup } from 'leaflet';
import 'leaflet.markercluster';
import LayersOptions = Control.LayersOptions;
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import { IrradiationChartComponent } from '../irradiation-chart/irradiation-chart.component';

@Component({
	selector: 'markercluster-demo',
	standalone: true,
	imports: [CommonModule, LeafletModule,
		LeafletMarkerClusterModule, IrradiationChartComponent],
	templateUrl: './map.component.html',
	encapsulation: ViewEncapsulation.None,
	styleUrl: './map.component.css'
})

export class MapComponent implements OnInit {
	constructor(private _ngZone: NgZone) { }

	// Weather location info from service
	weatherLocationList: WeatherLocation[] = [];
	filteredWeatherLocationList: WeatherLocation[] = [];
	filteredLat?: any;
	filteredLong?: any;
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
		center: L.latLng(1.675, 103.839)
	};

	// Marker cluster stuff
	markerClusterGroup: L.MarkerClusterGroup = new MarkerClusterGroup();
	markerClusterData: L.Marker[] = [];
	markerClusterOptions: L.MarkerClusterGroupOptions = {};

	ngOnInit() {
		this.weatherService.getAllWeatherLocations().then((weatherLocationList: WeatherLocation[]) => {
			this.weatherLocationList = weatherLocationList
			this.filteredWeatherLocationList = this.weatherLocationList;
			this.refreshData();
		});
	}

	markerClusterReady(group: L.MarkerClusterGroup) {
		this.markerClusterGroup = group;
	}

	refreshData(): void {
		const data: L.Marker[] = [];
		this.filteredWeatherLocationList.forEach(el => {
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
			).on('click', () => {
				this.open(el.name, el.label_location.latitude, el.label_location.longitude)
			})
			data.push(newMarker)
		})
		this.markerClusterData = data;
	}

	filterResults(text: string) {
		if (!text) {
			this.noResults();
		}
		else {
			this.filteredWeatherLocationList = this.weatherLocationList.filter((weatherLocation) =>
				weatherLocation?.name.toLowerCase() == text.toLowerCase()
			);
			if (this.filteredWeatherLocationList.length != 0) {
				this.filteredLat = this.filteredWeatherLocationList[0].label_location.latitude;
				this.filteredLong = this.filteredWeatherLocationList[0].label_location.longitude;
			}
			else {
				this.noResults();
			}
		}
		this.refreshData();
		console.log(this.filteredLat)
	}

	noResults(): void {
		this.filteredWeatherLocationList = this.weatherLocationList;
		this.filteredLat = null;
		this.filteredLong = null;
		alert("Oops no match!");
	}

	// ng-bootstrap modal
	private modalService = inject(NgbModal)
	open(name: string, lat: number, long: number) {
		this._ngZone.run(() => {
			const modalRef = this.modalService.open(ModalContentComponent, { size: 'xl', centered: true });
			modalRef.componentInstance.name = name;
			modalRef.componentInstance.lat = lat;
			modalRef.componentInstance.long = long;
		});
	}
}