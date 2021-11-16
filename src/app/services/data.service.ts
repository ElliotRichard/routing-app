import { Injectable } from '@angular/core';
import { RouteStop, IRoute } from '../types';
import { Subject, Observable, map, tap, catchError, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private route: IRoute = {};
  private waypointMap: Map<number, any> = new Map();
  private waypointComponentAmount: 0;
  center: Subject<any> = new Subject();
  routes: Subject<IRoute> = new Subject();
  addressList: Subject<any> = new Subject();
  routeAdded: Subject<boolean> = new Subject();
  addresses: string[] = [];
  private authToken: any;
  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private http: HttpClient
  ) {}

  setCenter(place) {
    this.center.next(place.geometry.location);
    this.addresses.push(place);
  }

  addRoute(place, type: RouteStop, wayPointIndex?: number) {
    this.routeAdded.next(true);
    switch (type) {
      case RouteStop.START:
        this.route.start = place.geometry.location;
        break;
      case RouteStop.WAYPOINT:
        this.waypointMap.set(wayPointIndex, place.geometry.location);
        // this.route.waypoints
        // ? this.route.waypoints.push(place.geometry.location)
        // : (this.route.waypoints = [place.geometry.location]);
        break;
      case RouteStop.END:
        this.route.end = place.geometry.location;
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
      this.route.waypoints = Array.from(this.waypointMap.values());
      console.log('Route WayPoints', this.route.waypoints);
    }
    this.routes.next(this.route);
  }

  signInUser(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password).then(
      (authToken) => {
        console.log('Sign in successful');
        this.authToken = authToken;
      },
      (error) => {
        console.log('sign in error', error);
      }
    );
  }

  signOutUser() {
    this.auth.signOut();
  }

  getUserCollection(): Observable<any> {
    console.log('Fetching with', `dogs/${this.authToken.user.uid}/dogs`);
    const dogs = `dogs/${this.authToken.user.uid}/dogs`;
    const userCollection = this.firestore.collection(dogs);
    return userCollection.valueChanges({ idField: 'name' });
  }
}
