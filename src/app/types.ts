/** The type of route location */
export enum ROUTE {
  START,
  WAYPOINT,
  END,
  /**
   * Use for database items
   */
  NONROUTE,
}

export interface IRoute {
  start?: any;
  end?: any;
  waypoints?: any[];
}

/**
 * Use to record latitude & longitude
 */
export interface ICoordinate {
  lat: number;
  lng: number;
}

export interface IDog {
  name: string;
  address: string;
  coordinates: ICoordinate;
  owner: string;
  notes: string;
}

export interface IRouteLocation {
  place?: any;
  type: ROUTE;
}

export interface IDogLocation extends IDog, IRouteLocation {}

export class IDogLocationFactory {
  static createFromIFireBaseDog(dog: IDog): IDogLocation {
    return {
      name: dog.name,
      address: dog.address,
      coordinates: dog.coordinates,
      owner: dog.owner,
      notes: dog.notes,
      place: dog.coordinates,
      type: ROUTE.NONROUTE,
    } as IDogLocation;
  }
}
