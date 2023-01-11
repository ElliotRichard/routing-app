import { Injectable } from '@angular/core';
import {
  ROUTE,
  IRoute,
  IDog,
  IDogLocation,
  IDogLocationFactory,
} from '../../shared/types';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private route: IRoute = { optimizeRoute: true, departureTime: null, waypoints: [] };
  private waypointMap: Map<number, any> = new Map();
  private waypointComponentAmount = 0;
  private dogsForRoute: Subject<IDogLocation> = new Subject<IDogLocation>();
  private center: Subject<any> = new Subject();
  private directionsPanelElement: Subject<string> = new Subject<string>();
  routes: Subject<IRoute> = new Subject();
  addressList: Subject<string[]> = new Subject<string[]>();
  routeAdded: Subject<boolean> = new Subject();
  constructor() {}

  addRoute(place, type: ROUTE, wayPointIndex?: number): void {
    this.routeAdded.next(true);
    switch (type) {
      case ROUTE.START:
        this.route.start = place.geometry.location;
        break;
      case ROUTE.WAYPOINT:
        this.waypointMap.set(wayPointIndex, place.geometry.location);
        break;
      case ROUTE.END:
        this.route.end = place.geometry.location;
        break;
      case ROUTE.NONROUTE:
        this.waypointMap.set(wayPointIndex, place);
        break;
    }
  }

  createWaypointComponent(): number {
    this.waypointComponentAmount++;
    return this.waypointComponentAmount;
  }

  deleteWaypointComponent(index: number): void {
    this.waypointMap.delete(index);
  }

  plotRoute(): void {
    console.log(`Start: ${this.route.start} End: ${this.route.end}`);
    if (this.waypointComponentAmount !== 0) {
      let addresses = Array.from(this.waypointMap.values());
      this.route.waypoints = addresses;
    }
    console.log(`date service: ${this.route.waypoints}`);
    this.routes.next(this.route);
    this.directionsPanelElement.next('.directionsPanel')
  }

  addDogToRoute(dog: IDog): void {
    const dogLocation = IDogLocationFactory.createFromIFireBaseDog(dog);
    this.addRoute(
      dogLocation.coordinates,
      dogLocation.type,
      this.createWaypointComponent()
    );
    this.dogsForRoute.next(dogLocation);
  }

  $getMapCenter(): Observable<any> {
    return this.center;
  }

  setMapCenter(place: any): void {
    this.center.next(place.geometry.location);
  }

  $getDogsForRoute(): Observable<IDogLocation> {
    return this.dogsForRoute;
  }

  $getDirectionsPanelElement(): Observable<string> {
    return this.directionsPanelElement;
  }

  clearRoute(): void {
    this.directionsPanelElement.next(null);
    this.waypointMap = new Map<number, any>();
    this.route = { optimizeRoute: true, departureTime: null, waypoints: [] };
  }

  reverseRouteOptimization(): void {
    this.route.optimizeRoute = !this.route.optimizeRoute;
  }

  setDepartureTime(timeDate: Date): void {
    this.route.departureTime = timeDate;
  }
}
