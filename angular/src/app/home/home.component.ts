import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { LogService } from '../log.service';
import { PageService } from '../page.service';
import { PageComponent } from '../page.component';

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
 	styleUrls: []
})

@Injectable()
export class HomeComponent  {
	log: LogService;
  pageService: PageService;

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
              private _pageService: PageService,
	            private _pageComp: PageComponent) {
		this.log = _logger;
		this.pageService = _pageService;
		this.log.info('HomeComponent.constructor() BEGIN');

    if (this.pageService.attemptToChangePage('Home', 'This is the MapMyShop home page.  More to come...')) {
      // Set up page data.
      this.log.info("HomeComponent.constructor()  Closing hamburger menu...");
      _pageComp.closeHamburgerMenu();
      this.log.info("HomeComponent.constructor()  Closing hamburger menu... Done.");

      this.log.info("HomeComponent.constructor()  About to call clearAndAddBreadcrumb()...");
      _pageComp.clearAndAddBreadcrumb('/mapmyshop/#/home', 'Home');
    }
    //_pageComp.refresh();
	}

}
