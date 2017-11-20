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

	// The current list of nav items available to the current user.
  navItems: NavItem[] = [];
  private _observableList: BehaviorSubject<NavItem[]> = new BehaviorSubject([]);
  get observableList(): Observable<NavItem[]> {
    return this._observableList.asObservable()
  }

  // A map of all available nav options, not all of which will be available to the
  // current user.
  navOptions : { [key:string]:NavItem; } = {};

  // Constructor
	constructor(private _logger:LogService) {
		this.log = _logger;
		this.log.info('NavItemService.constructor()');

		// Populate nav items list
	  this.navOptions = {
      home: new NavItem({
        id: 'nav1',
        href: '/home',
        classPrefix: 'open',
        glyphicon: 'glyphicon-home',
        displayText: 'Home'
      }),
      users: new NavItem({
        id: 'nav2',
        href: '/users',
        classPrefix: 'open',
        glyphicon: 'glyphicon-user',
        displayText: 'Users'
      }),
      stores: new NavItem({
        id: 'nav2',
        href: '/stores',
        classPrefix: 'open',
        glyphicon: 'glyphicon-shopping-cart',
        displayText: 'Stores'
      }),
      search: new NavItem({
        id: 'nav3',
        href: '#',
        classPrefix: 'open',
        glyphicon: 'glyphicon-search',
        displayText: 'Search'
      }),
      preferences: new NavItem({
        id: 'nav4',
        href: '#',
        classPrefix: 'open',
        glyphicon: 'glyphicon-wrench',
        displayText: 'Preferences'
      }),
      logout: new NavItem({
        id: 'navLogout',
        href: '#',
        classPrefix: 'open',
        glyphicon: 'glyphicon-wrench',
        displayText: 'Logout'
      })
    };
	}

	resetNavItems(_email: string) {
	  this.log.info('NavItemService.resetNavItems() -> ' + _email);
    if (_email == "atlantatechie@gmail.com") {
      // Mike is logged in. Allow access.
      this.navItems = [];
      this.navItems.push(this.navOptions.stores);
      this.navItems.push(this.navOptions.users);
      this.navItems.push(this.navOptions.home);
      this.navItems.push(this.navOptions.logout);
    } else {
      this.navItems = [];
      this.navItems.push(this.navOptions.home);
    }
    this.logNavItems();
	  this.refresh();
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

  logNavItems() {
    this.log.info("NavItems:");
    for (let i = 0; i < this.navItems.length; i++) {
      let next: NavItem = this.navItems[i];
      this.log.info("   [" + (i+1) + "]:");
      if (next == undefined) {
        this.log.info("      [undefined]");

      } else {
        this.log.info("      id: " + next.id);
        this.log.info("      href: " + next.href);
        this.log.info("      glyphicon: " + next.glyphicon);
        this.log.info("      displayText: " + next.displayText);
        this.log.info("      classPrefix: " + next.classPrefix);
      }
    }
  }


}
