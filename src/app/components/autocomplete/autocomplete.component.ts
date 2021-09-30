import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { DataService } from '../../services/data.service';
import { RouteStop, IRoute } from '../../types';
import { MatIconRegistry } from '@angular/material/icon';
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit, AfterViewInit {
  addressType: string = 'address';
  currentWaypoint?: any;
  waypointComponentIndex?: number;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('destination_input') addresstext: any;
  @Input() type: RouteStop;
  autocompleteInput: string;
  queryWait: boolean;

  constructor(
    private dataService: DataService,
    private matIconRegistry: MatIconRegistry
  ) {
    // this.addresstext.focus();
    this.matIconRegistry.addSvgIcon('dog', '../images/dog.svg');
  }

  ngOnInit() {
    // this.addresstext = '';

    if (this.type === RouteStop.WAYPOINT) {
      this.waypointComponentIndex = this.dataService.createWaypointComponent();
    }
  }

  ngAfterViewInit() {
    this.addresstext.nativeElement.focus();
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    const outerWellingtonBounds: google.maps.LatLngBounds =
      new google.maps.LatLngBounds(
        // SouthWest coordinates
        {
          lng: 174.5947265625,
          lat: -41.409775832009544,
        },
        // NorthEast coordinates
        { lng: 175.1495361328125, lat: -41.01099329360267 }
      );
    const autocomplete = new google.maps.places.Autocomplete(
      this.addresstext.nativeElement,
      {
        bounds: outerWellingtonBounds,

        componentRestrictions: { country: 'NZ' },
        fields: ['address_components', 'geometry'],
        types: ['address'], // 'establishment' / 'address' / 'geocode'
      }
    );
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
      if (this.type === RouteStop.WAYPOINT) {
        this.dataService.addRoute(
          place,
          this.type,
          this.waypointComponentIndex
        );
      } else this.dataService.addRoute(place, this.type);
    });
  }

  invokeEvent(place: any) {
    this.setAddress.emit(place);
    this.dataService.setCenter(place);
  }
}
