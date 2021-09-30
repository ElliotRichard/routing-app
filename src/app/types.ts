export enum RouteStop {
  START,
  WAYPOINT,
  END,
}

export interface IRoute {
  start?: any;
  end?: any;
  waypoints?: any[];
}
