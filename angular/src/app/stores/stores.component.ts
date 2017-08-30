import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { LogService } from '../log.service';
import {StoresService } from './stores.service';
import { PageComponent } from '../page.component';

@Component({
	selector: 'stores',
	templateUrl: './stores.component.html',
 	styleUrls: []
})

@Injectable()
export class StoresComponent  {
	log: LogService;
	storesService: StoresService;

/*
	interval: number = 60;
	counter: number = 0;
  offset: number = 0;
  paused: boolean = false;
	currentValue: number = this.interval;
	percentage: number = 0;
	currentDisplay: string = "Not Started";
  timerStarted: boolean = false;
  color: string = "status_green";
  pauseButtonCaption = "Pause";
  yellowThreshold: number = 8;
  redWarningThreshold: number = 3;
  personCounter: number = 0;
  nextSound: number = 1;
*/

	constructor(private _logger: LogService,
	            private _storesService: StoresService,
	            private _pageComp: PageComponent) {
		this.log = _logger;
		this.log.info('StoresService.constructor() BEGIN');
		this.storesService = _storesService;

		// Set up page data.
    this.log.info("StoreComponent.constructor()  Closing hamburger menu...");
    _pageComp.closeHamburgerMenu();
    this.log.info("StoreComponent.constructor()  Closing hamburger menu... Done.");
		_pageComp.pageName = 'Stores';
		_pageComp.subTitle = 'Select a store and start mapping your way to a better shopping experience! Let us know what you\'re looking for and we\'ll help you find it quickly and efficiently.';

    this.log.info("StoreComponent.constructor()  About to call clearAndAddBreadcrumb()...");
    //_pageComp.clearAndAddBreadcrumb('/stores', 'My Stores')
    _pageComp.clearAndAddBreadcrumb('/mapmyshop/stores', 'My Stores');
	}

}
