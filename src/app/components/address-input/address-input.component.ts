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
import { ROUTE } from '../../../shared/types';

@Component({
  selector: 'app-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.scss'],
})
export class AddressInputComponent implements OnInit, AfterViewInit {
  @Output() address: EventEmitter<any> = new EventEmitter();
  @ViewChild('addressInput') addressForm: any;
  @Input() type: ROUTE | null;
  private waypointComponentIndex?: number;
  public icon: string;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    switch (this.type) {
      case ROUTE.WAYPOINT:
        this.waypointComponentIndex =
          this.dataService.createWaypointComponent();
        this.icon = 'dog';
        break;
      case ROUTE.START:
        this.icon = 'place';
        break;
      case ROUTE.END:
        this.icon = 'map';
        break;
      default:
      case ROUTE.NONROUTE:
        this.icon = 'map';
    }
  }

  ngAfterViewInit() {
    this.addressForm.nativeElement.focus();
    this.setAddress();
  }

  private setAddress() {
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
      this.addressForm.nativeElement,
      {
        bounds: outerWellingtonBounds,
        componentRestrictions: { country: 'NZ' },
        fields: ['address_components', 'geometry'],
        types: ['address'],
      }
    );
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.addressSet(place);
      if (this.type === ROUTE.WAYPOINT) {
        this.dataService.addRoute(
          place,
          this.type,
          this.waypointComponentIndex
        );
      } else this.dataService.addRoute(place, this.type);
    });
  }
  addressSet(place: google.maps.places.PlaceResult) {
    this.address.emit(place);
    this.dataService.setMapCenter(place);
  }
}
