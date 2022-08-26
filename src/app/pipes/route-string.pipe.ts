import { Pipe, PipeTransform } from '@angular/core';
import { ROUTE } from '../../shared/types';
@Pipe({
  name: 'routeString',
})

/**
 *  Returns the type of Route that the enum represents
 */
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
