import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { NavItem } from './nav-item';
import { LogService } from './log.service';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

@Injectable()
// NOTE: For now, there is no DB so data is stored
// in memory only.
export class NavItemService {

	log: LogService;

	// Placeholder for items.
	navItems: NavItem[] = [];
  private _observableList: BehaviorSubject<NavItem[]> = new BehaviorSubject([]);
  get observableList(): Observable<NavItem[]> { return this._observableList.asObservable() }

	constructor(private _logger:LogService) {
		this.log = _logger;
		this.log.info('NavItemService.constructor()');

		// Populate nav items list
	  this.navItems = [
            new NavItem({
              id: 'nav1',
              href: '/home',
              classPrefix: 'open',
              glyphicon: 'glyphicon-home',
              displayText: 'Home'
            }),
            new NavItem({
              id: 'nav2',
              href: '/stores',
              classPrefix: 'protected',
              glyphicon: 'glyphicon-shopping-cart',
              displayText: 'Stores'
            }),
            new NavItem({
              id: 'nav3',
              href: '#',
              classPrefix: 'protected',
              glyphicon: 'glyphicon-search',
              displayText: 'Search'
            }),
            new NavItem({
              id: 'nav4',
              href: '#',
              classPrefix: 'protected',
              glyphicon: 'glyphicon-wrench',
              displayText: 'Preferences'
            }),
            new NavItem({
              id: 'googleBtn',
              href: '#',
              classPrefix: 'googleAuth',
              glyphicon: 'glyphicon-user',
              displayText: 'Login'
            })
  	];
	}

	clear() {
    this.log.debug('NavItemService.clear()');
    this.navItems = [];
  }

	add(item: NavItem) {
    this.log.debug('NavItemService.add() - ' + item.displayText);
    this.navItems.push(item);
  }

  refresh() {
    this.log.debug('NavItemService.refresh()');
    this._observableList.next(this.navItems);
  }

	getAll(): NavItem[] {
		this.log.debug('NavItemService.getAll() count=' + this.navItems.length);
		return this.navItems;
	}

}
