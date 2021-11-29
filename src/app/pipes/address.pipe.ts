import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(address: string, zone: string): unknown {
    switch (zone) {
        case ('suburb'):
          let street = address.indexOf(',');
          return address.substring(0, address.indexOf(',', street +1));
    }
    return null;
  }

}
