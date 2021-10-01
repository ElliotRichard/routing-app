import { DataService } from './../../services/data.service';
import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  Input,
  AfterViewInit,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
// import { tspClass } from '../../../../../source-archive/google-maps-tsp-solver/trunk/BpTspSolver';
import { IRoute } from '../../types';
@Component({
  selector: 'app-alternate-map',
  templateUrl: './alternate-map.component.html',
  styleUrls: ['./alternate-map.component.scss'],
})
export class AlternateMapComponent implements OnInit, AfterViewInit {
  @ViewChild('mapRef', { static: true }) mapElement: ElementRef;
  map;
  markers = [];
  private directionsService = new google.maps.DirectionsService();
  private directionsRenderer = new google.maps.DirectionsRenderer();
  @Input() center;
  constructor(private dataService: DataService, private elRef: ElementRef) {}
  ngAfterViewInit() {
    this.directionsRenderer.setPanel(
      this.elRef.nativeElement.querySelector('directionsPanel')
    );
  }
  ngOnInit() {
    this.renderMap();
    // this.addRouting();
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
    /*   this.center.subscribe((address: google.maps.places.PlaceResult) => {
      console.log(`new address: ${address}`);
      this.map.setCenter(address);
      let marker = new google.maps.Marker({ map: this.map });
      marker.setPosition(address.geometry.location);
    }); */
    this.dataService.center.subscribe((center) => {
      console.log(`new center: ${center}`);
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
    const route = response.routes[0];
    const from = route.legs[0].start_address;
    const to = route.legs[route.legs.length - 1].end_address;
    for (let i = 0; i < route.legs.length; i++) {
      total += route.legs[i].distance.value;
      time += route.legs[i].duration.value;
      console.log(`time: ${route.legs[i].duration.value}`);
    }
    time = time / 60;
    let timeString = time.toString();
    timeString = timeString.replace('hours', 'H');
    timeString = timeString.replace('mins', 'M');
    total = total / 1000;
    document.getElementById('from').innerHTML =
      from.split(',')[0] + '-' + to.split(',')[0];
    document.getElementById('duration').innerHTML = timeString + 'm';
    document.getElementById('total').innerHTML = Math.round(total) + 'KM';
  }

  addRouting = () => {
    /*     let directionsPanel = document.getElementById('my_textual_div');
    let tsp = new tspClass(this.map, directionsPanel);
    tsp.setAvoidHighways(true);
    tsp.setTravelMode(google.maps.TravelMode['DRIVING']);
    tsp.addAddress('201 Aro st', tsp.addAddressCallback);
    tsp.addAddress('205 Aro st', tsp.addAddressCallback);
    tsp.solveRoundTrip(tsp.onSolveCallBack);
    console.log(`Solution: ${tsp.getGDirections()}`); */
  };

  loadMap = () => {
    this.map = new window['google'].maps.Map(this.mapElement.nativeElement, {
      center: { lat: -41.2945923, lng: 174.7629202 },
      zoom: 8,
      disableDefaultUI: true,
    });

    /*     var marker = new window['google'].maps.Marker({
      position: { lat: -41.2945923, lng: 174.7629202 },
      map: this.map,
      title: 'Hello World!',
      draggable: true,
      animation: window['google'].maps.Animation.DROP,
    }); */

    var contentString =
      '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h3 id="thirdHeading" class="thirdHeading">Marker Chosen</h3>' +
      '<div id="bodyContent">' +
      '<p>This is a marker</p>' +
      '</div>' +
      '</div>';

    // var infowindow = new window['google'].maps.InfoWindow({content: contentString,});

    /*   marker.addListener('click', () => {
      infowindow.open(this.map, marker);
    }); */
    /*  const card = document.getElementById('pac-card') as HTMLElement;
    const input = document.getElementById('pac-input') as HTMLInputElement;
    const biasInputElement = document.getElementById(
      'use-location-bias'
    ) as HTMLInputElement;
    const strictBoundsInputElement = document.getElementById(
      'use-strict-bounds'
    ) as HTMLInputElement;
    const options = {
      fields: ['formatted_address', 'geometry', 'name'],
      strictBounds: false,
      types: ['establishment'],
    }; */

    // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

    // const autocomplete = new google.maps.places.Autocomplete(input, options);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    //  autocomplete.bindTo('bounds', this.map);

    /*  const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById(
      'infowindow-content'
    ) as HTMLElement;

    infowindow.setContent(infowindowContent);

    const marker = new window['google'].maps.Marker({
      map: this.map,
      anchorPoint: new google.maps.Point(0, -29),
    });

    autocomplete.addListener('place_changed', () => {
      infowindow.close();
      marker.setVisible(false);
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      } */

    // If the place has a geometry, then present it on a map.
    /*     if (place.geometry.viewport) {
        this.map.fitBounds(place.geometry.viewport);
      } else {
        this.map.setCenter(place.geometry.location);
        this.map.setZoom(17);
      } */

    /*   marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      infowindowContent.children['place-name'].textContent = place.name;
      infowindowContent.children['place-address'].textContent =
        place.formatted_address;
      infowindow.open(this.map, marker); */
    // });
  };
  renderMap() {
    window['initMap'] = () => {
      this.loadMap();
    };
    this.loadMap();
    if (!window.document.getElementById('google-map-script')) {
      /*       var s = window.document.createElement('script');
      s.id = 'google-map-script';
      s.type = 'text/javascript';
      s.src =
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyBe6YqLpwHy8-5VHaObcMF2T52qOd-VL-Y&callback=initMap&libraries=places';

      window.document.body.appendChild(s); */
    } else {
      // this.loadMap();
    }
  }
}
