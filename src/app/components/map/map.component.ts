import { DataService } from '../../services/data.service';
import { Component, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import { IRoute } from '../../types';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @ViewChild('mapRef', { static: true }) mapElement: ElementRef;
  map;
  markers = [];
  private directionsService = new google.maps.DirectionsService();
    private directionsRenderer = new google.maps.DirectionsRenderer();
    showFooter = false;
  @Input() center;
  constructor(private dataService: DataService) {}
    ngOnInit() {
	this.dataService.routes.subscribe((newRoute)=> {
	    this.showFooter = true;
	});
    this.loadMap();
    this.directionsRenderer.setPanel(
      window.document.querySelector('.directionsPanel')
    );
    this.directionsRenderer.setMap(this.map);

    this.dataService.routes.subscribe((newRoute: IRoute) => {
      let waypoints = [];
      if (newRoute.waypoints) {
        for (let waypoint of newRoute.waypoints) {
          waypoints.push({
            location: waypoint,
            stopover: true,
          });
        }
      }
      for (let marker of this.markers) {
        marker.setMap(null);
      }
      this.directionsService.route(
        {
          origin: newRoute.start,
          destination: newRoute.end,
          waypoints: waypoints,
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response) => {
          this.directionsRenderer.setDirections(response);
          this.getDistance(response);
        }
      );
    });
    this.dataService.center.subscribe((center) => {
      this.map.setCenter(center);
      let marker = new google.maps.Marker({ map: this.map });
      marker.setPosition(center);
      this.map.setZoom(15);
      this.markers.push(marker);
    });
  }

  getDistance(response: google.maps.DirectionsResult) {
    let total = 0;
    let time = 0;
    let addresses = [];
    const route = response.routes[0];
    const from = route.legs[0].start_address;
    const to = route.legs[route.legs.length - 1].end_address;
    for (let i = 0; i < route.legs.length; i++) {
      // Record route
      addresses.push(route.legs[i].start_address);
      total += route.legs[i].distance.value;
      time += route.legs[i].duration.value;
    }
    addresses.push(route.legs[route.legs.length - 1].end_address);
    addresses.shift();
    addresses.pop();
    this.dataService.addressList.next(addresses);
    time = time / 60;
    total = total / 1000;
    document.getElementById('from').innerHTML =
      from.split(',')[0] + '-' + to.split(',')[0];
    document.getElementById('duration').innerHTML = Math.round(time) + 'm';
    document.getElementById('total').innerHTML = Math.round(total) + 'KM';
  }

  loadMap() {
    this.map = new window['google'].maps.Map(this.mapElement.nativeElement, {
      center: { lat: -41.2945923, lng: 174.7629202 },
      zoom: 8,
      disableDefaultUI: true,
    });
  }
}
