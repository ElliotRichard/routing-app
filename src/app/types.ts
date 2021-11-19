export enum RouteStop {
  START,
  WAYPOINT,
  END,
  // This is for storage of routes in database
  NONROUTE,
}

export interface IRoute {
  start?: any;
  end?: any;
  waypoints?: any[];
}

export interface IFireBaseDog {
  name: string;
  address: string;
  coordinates: { latitude: string; longitude: string } | string;
  owner: string;
  notes: string;
}
