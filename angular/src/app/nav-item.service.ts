import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { NavItem } from './nav-item';
import { Logger } from 'angular2-logger/app/core/logger';
import { LogService } from './log.service';

@Injectable()
// NOTE: For now, there is no DB so data is stored
// in memory only.
export class NavItemService {

	log: LogService;

	// Placeholder for items.
	navItems: NavItem[] = [];

	constructor(private _logger:LogService) {
		this.log = _logger;
		this.log.debug('NavItemService.constructor()');

		// Populate nav items list
	  this.navItems = [
	    new NavItem({
        id: 'nav1',
			  href: '/stores',
  			glyphicon: 'glyphicon-shopping-cart',
	  		displayText: 'Stores'
		  }),
  	  new NavItem({
        id: 'nav2',
	  		href: '#',
		  	glyphicon: 'glyphicon-search',
			  displayText: 'Search'
  		}),
	    new NavItem({
        id: 'nav3',
		  	href: '#',
			  glyphicon: 'glyphicon-wrench',
		  	displayText: 'Preferences'
	  	})  /*,
      new NavItem({
        id: 'googleBtn',
        href: '#',
        glyphicon: '\'glyphicon-search',
        displayText: 'Login'
      }) */
  	];
	}

	// GET /navitems
	getAll(): NavItem[] {
		this.log.debug('NavItemService.getAll() count=' + this.navItems.length);
		return this.navItems;
	}

}
