import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subject, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  addressList: Observable<any>;
  displayPanel = 'none';
  routeTabActive = true;
  selectedTab = new FormControl(0);
  disableDirectionTab = true;
  directionTabActive = false;
  displayAddressInput = 'block';
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.addressList = this.dataService.addressList.pipe
    (tap(() => {
        this.disableDirectionTab = false;
        this.selectedTab.setValue(1);
    	})
    );
    this.selectedTab.valueChanges.subscribe((newValue) => {
      if (newValue === 0) {
        this.routeTabActive = true;
        this.directionTabActive = false;
      } else if (newValue === 1) {
        this.directionTabActive = true;
        this.routeTabActive = false;
      }
    });
  }
  newRoute() {
    this.displayAddressInput = 'block';
    this.displayPanel = 'none';
  }
}
