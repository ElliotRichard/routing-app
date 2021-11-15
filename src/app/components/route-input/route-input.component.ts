import { DataService } from '../../services/data.service';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { RouteStop } from '../../types';
@Component({
  selector: 'app-route-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './route-input.component.html',
  styleUrls: ['./route-input.component.scss'],
})
export class RouteInputComponent implements OnInit {
  @Output() routeAdded: EventEmitter<any> = new EventEmitter();
  private addressCount = 0;
  addresses: number[] = [RouteStop.START, RouteStop.END];
  displayFooter = 'none';
  componentType: RouteStop = RouteStop.WAYPOINT;
  showAddWaypoint = false;
  showFindRoute = false;
  constructor(
    private dataService: DataService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataService.center.subscribe((newCenter) => {
      console.log('newCenter at addressInput');
      // this.displayFooter = 'flex';
    });
    this.dataService.routeAdded.subscribe((routeAdded) => {
      console.log('route-input: route added');
      // this.showAddWaypoint = true;
    });
  }
  addressSet($address) {
    console.log('route-input: addressSet()', $address);
    this.addressCount++;
    if (this.addressCount >= this.addresses.length) {
      this.showAddWaypoint = true;
      this.showFindRoute = true;
      this.changeDetectorRef.detectChanges();
    }
  }
  addRouteWaypoint() {
    this.addresses.push(RouteStop.WAYPOINT);
    this.showAddWaypoint = false;
  }
  getRoute() {
    this.routeAdded.emit(true);
    this.dataService.plotRoute();
  }
}
