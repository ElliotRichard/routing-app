import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { DataService } from '../../services/data.service';
import { ROUTE, IRouteLocation, IDogLocation } from '../../types';

@Component({
  selector: 'app-route-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './route-input.component.html',
  styleUrls: ['./route-input.component.scss'],
})
export class RouteInputComponent implements OnInit {
  @Output() routeAdded: EventEmitter<any> = new EventEmitter();
  public addresses: any[] = [{ type: ROUTE.START }, { type: ROUTE.END }];
  public componentType: ROUTE = ROUTE.WAYPOINT;
  public showAddWaypoint = false;
  public showFindRoute = false;
  private addressCount = 0;

  constructor(
    private dataService: DataService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataService
      .$getDogsForRoute()
      .subscribe((dog: IDogLocation) => this.addDatabaseLocation(dog));
  }
  routeLocationAdded(): void {
    this.addressCount++;
    if (this.addressCount >= this.addresses.length) {
      this.showAddWaypoint = true;
      this.showFindRoute = true;
      this.changeDetectorRef.detectChanges();
    }
  }

  addressSet($address): void {
    this.routeLocationAdded();
  }
  addRouteWaypoint(): void {
    this.addresses.push({ type: ROUTE.WAYPOINT } as IRouteLocation);
    this.showAddWaypoint = false;
  }
  addDatabaseLocation(dog: IDogLocation): void {
    this.addresses.push(dog);
    this.changeDetectorRef.detectChanges();
    this.routeLocationAdded();
  }
  getRoute(): void {
    this.routeAdded.emit(true);
    this.dataService.plotRoute();
  }
  
}
