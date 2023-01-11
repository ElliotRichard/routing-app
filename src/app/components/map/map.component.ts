import { DataService } from '../../services/data.service';
import { Component, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import { IRoute, DirectionsRequestFactory } from '../../../shared/types';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
	@Input() center;
	@ViewChild('mapRef', { static: true }) mapElement: ElementRef;
	public showFooter = false;
    private directionsService: google.maps.DirectionsService;
    private directionsRenderer: google.maps.DirectionsRenderer;
	private map;
	private markers = [];

	constructor(private dataService: DataService) {}

	ngOnInit() {
		if (window.google !== undefined) {
			this.loadMap();
			this.directionsService = new google.maps.DirectionsService();
			this.directionsRenderer = new google.maps.DirectionsRenderer();
			this.directionsRenderer.setPanel(
				window.document.querySelector('.directionsPanel')
			);

			this.directionsRenderer.setMap(this.map);

			this.dataService
				.$getDirectionsPanelElement()
				.subscribe((element: string) => {
					if (element == null) {
					this.directionsRenderer.setMap(null);
					this.showFooter = false;
					} else this.directionsRenderer.setMap(this.map);
					this.directionsRenderer.setPanel(window.document.querySelector(element));
				});

			this.dataService.routes.subscribe((newRoute: IRoute) => {
				this.showFooter = true;
				this.clearAllMarkersFromMap();
				this.directionsService.route(
					DirectionsRequestFactory.createRequestFromIRoute(newRoute),
					(response) => {
						this.directionsRenderer.setDirections(response);
						this.dataService.addressList.next(this.getRouteDetails(response));
				});
			});

			this.dataService.$getMapCenter().subscribe((center) => {
				this.map.setCenter(center);
				let marker = new google.maps.Marker({ map: this.map });
				marker.setPosition(center);
				this.map.setZoom(15);
				this.markers.push(marker);
			});
		}
	}

	getRouteDetails(response: google.maps.DirectionsResult): string[] {
		let total = 0;
		let time = 0;
		let waypointAddresses: string[] = [];
		const route = response.routes[0];
		const from = route.legs[0].start_address;
		const to = route.legs[route.legs.length - 1].end_address;
		for (let i = 0; i < route.legs.length; i++) {
		// Record route
		waypointAddresses.push(route.legs[i].start_address);
		total += route.legs[i].distance.value;
		time += route.legs[i].duration.value;
		}
		// Remove start point (not a waypoint)
		waypointAddresses.shift();
		time = time / 60;
		total = total / 1000;
		document.getElementById('from').innerHTML = from.split(',')[0] + ' to ' + to.split(',')[0];
		document.getElementById('duration').innerHTML = Math.round(time) + 'm';
		document.getElementById('total').innerHTML = Math.round(total) + 'KM';
		return waypointAddresses;
	}

	loadMap() {
		this.map = new google.maps.Map(this.mapElement.nativeElement, {
			center: { lat: -41.2945923, lng: 174.7629202 },
			zoom: 8,
			disableDefaultUI: true,
		});
	}
  
	clearAllMarkersFromMap() {
		for (let marker of this.markers) {
			marker.setMap(null);
		}
	}
}
