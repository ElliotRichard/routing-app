import { Pipe, PipeTransform } from '@angular/core';
import { ROUTE } from '../types';
@Pipe({
  name: 'routeString',
})
export class RouteStringPipe implements PipeTransform {
  transform(value: ROUTE, ...args: unknown[]): string {
    switch (value) {
      case ROUTE.START:
        return 'START';
      case ROUTE.WAYPOINT:
        return 'DOG ADDRESS';
      case ROUTE.END:
        return 'DESTINATION';
      default:
        return value.toString();
    }
  }
}
