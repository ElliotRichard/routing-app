import { Pipe, PipeTransform } from '@angular/core';
import { RouteStop } from '../types';
@Pipe({
  name: 'routeString',
})
export class RouteStringPipe implements PipeTransform {
  transform(value: RouteStop, ...args: unknown[]): string {
    if (value === RouteStop.WAYPOINT) {
      return 'DESTINATION';
    } else return RouteStop[value];
  }
}
