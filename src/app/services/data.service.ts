import { Injectable } from '@angular/core';
import {
  ROUTE,
  IRoute,
  IDog,
  IDogLocation,
  IDogLocationFactory,
} from '../types';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private route: IRoute = {};
  private waypointMap: Map<number, any> = new Map();
  private waypointComponentAmount: 0;
  private dogsForRoute: Subject<IDogLocation> = new Subject<IDogLocation>();
  private center: Subject<any> = new Subject();
  routes: Subject<IRoute> = new Subject();
  addressList: Subject<any> = new Subject();
  routeAdded: Subject<boolean> = new Subject();
  addresses: string[] = [];
  private directionsPanelElement: Subject<string> = new Subject<string>();
  constructor(private http: HttpClient) {}

  addRoute(place, type: ROUTE, wayPointIndex?: number) {
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

  createWaypointComponent() {
    this.waypointComponentAmount++;
    return this.waypointComponentAmount;
  }

  deleteWaypointComponent(index: number) {
    this.waypointMap.delete(index);
  }

  plotRoute() {
    console.log(`Start: ${this.route.start} End: ${this.route.end}`);
    if (this.waypointComponentAmount !== 0) {
      let addresses = Array.from(this.waypointMap.values());
     // this.addressList.next(addresses);
      this.route.waypoints = addresses;
      console.log('Route WayPoints', this.route.waypoints);
    }
    this.routes.next(this.route);
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

  setMapCenter(place: any) {
    this.center.next(place.geometry.location);
    this.addresses.push(place);
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
  }
}
