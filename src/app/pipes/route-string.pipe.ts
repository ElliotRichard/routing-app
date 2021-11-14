import { Pipe, PipeTransform } from '@angular/core';
import { RouteStop } from '../types';
@Pipe({
  name: 'routeString',
})
export class RouteStringPipe implements PipeTransform {
    transform(value: RouteStop, ...args: unknown[]): string {
	switch(value) {
	    case (RouteStop.START):
		return 'START';
	    case (RouteStop.WAYPOINT):
		return 'DOG ADDRESS';
	    case (RouteStop.END):
		return 'DESTINATION';
	    default:
		return value;
		
	}
  }
}
