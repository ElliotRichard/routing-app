import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { tspClass } from '../../../../../source-archive/google-maps-tsp-solver/trunk/BpTspSolver';

@Component({
  selector: 'app-alternate-map',
  templateUrl: './alternate-map.component.html',
  styleUrls: ['./alternate-map.component.scss'],
})
export class AlternateMapComponent implements OnInit {
  @ViewChild('mapRef', { static: true }) mapElement: ElementRef;
  map;
  constructor() {}

  ngOnInit() {
    this.renderMap();
    // this.addRouting();
  }

  addRouting = () => {
    let directionsPanel = document.getElementById('my_textual_div');
    let tsp = new tspClass(this.map, directionsPanel);
    tsp.setAvoidHighways(true);
    tsp.setTravelMode(google.maps.TravelMode['DRIVING']);
    tsp.addAddress('201 Aro st', tsp.addAddressCallback);
    tsp.addAddress('205 Aro st', tsp.addAddressCallback);
    tsp.solveRoundTrip(tsp.onSolveCallBack);
    console.log(`Solution: ${tsp.getGDirections()}`);
  };

  loadMap = () => {
    this.map = new window['google'].maps.Map(this.mapElement.nativeElement, {
      center: { lat: -41.2945923, lng: 174.7629202 },
      zoom: 8,
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
    const card = document.getElementById('pac-card') as HTMLElement;
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
    };

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

    const autocomplete = new google.maps.places.Autocomplete(input, options);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', this.map);

    const infowindow = new google.maps.InfoWindow();
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
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        this.map.fitBounds(place.geometry.viewport);
      } else {
        this.map.setCenter(place.geometry.location);
        this.map.setZoom(17);
      }

      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      infowindowContent.children['place-name'].textContent = place.name;
      infowindowContent.children['place-address'].textContent =
        place.formatted_address;
      infowindow.open(this.map, marker);
    });
  };
  renderMap() {
    window['initMap'] = () => {
      this.loadMap();
    };
    if (!window.document.getElementById('google-map-script')) {
      var s = window.document.createElement('script');
      s.id = 'google-map-script';
      s.type = 'text/javascript';
      s.src =
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyBe6YqLpwHy8-5VHaObcMF2T52qOd-VL-Y&callback=initMap&libraries=places';

      window.document.body.appendChild(s);
    } else {
      this.loadMap();
    }
  }
}
