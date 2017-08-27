import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Logger } from 'angular2-logger/app/core/logger';
import { LogService } from './log.service';
import { BrandIcon } from './brand-icon';
import { NavItem } from './nav-item';
import { NavItemService } from './nav-item.service';
import { HeaderComponent } from './header.component';
import {BreadcrumbsComponent} from "./shared/breadcrumbs.component";

@Component({
	selector: 'page',
	templateUrl: './page.component.html',
	providers: [HeaderComponent,
              BreadcrumbsComponent],
	styleUrls: []
})

@Injectable()
export class PageComponent  {
	pageName: string = '[PageName]';
	subTitle: string = '[SubTitle]';

	// Preferences
	showBreadcrumbs: boolean = true;
	showHint: boolean = true;
	headerDisplay: string = 'block';
	brandForename: string = 'Map My Shop';
	brandSurname: string = '';

	brandIcon = new BrandIcon({
			image: 'assets/images/treasure-map2-640.png',
			displayText: 'Map My Shop'
		});

	navItems: NavItem[] = []
	navItemService: NavItemService;
	headerComp: HeaderComponent;
	breadcrumbsComp: BreadcrumbsComponent;

	// Messages
	//alertMsg: string = 'Danger, Will Robinson!!  Danger!!';
	alertMsg: string = undefined;
	alertType: string = 'alert-success';

	log: LogService;

	constructor(private _logger: LogService,
	            private _navItemService: NavItemService,
	            private _headerComp: HeaderComponent,
              private _breadcrumbsComp: BreadcrumbsComponent) {
    // Arguments
		this.log = _logger;
		this.navItemService = _navItemService;

		this.log.debug('PageComponent.constructor() BEGIN');
		this.log.info('PageComponent.constructor() BEGIN');
    this.navItems = this.navItemService.getAll();
		this.log.info('PageComponent.constructor()    NavItem count=' + this.navItems.length);
		this.headerComp = _headerComp;
    this.breadcrumbsComp = _breadcrumbsComp;
	}

	closeHamburgerMenu() {
	  this.headerComp.closeHamburgerMenu();
	}

  clearBreadcrumbs() {
    this.breadcrumbsComp.clear();
  }

  clearAndAddBreadcrumb(_href: string, _displayText: string) {
    this.log.info("PageComponent.clearAndAdd(href='" + _href + "', displayText='" + _displayText  + "')");
    this.breadcrumbsComp.clearAndAdd(_href, _displayText);
  }

  addBreadcrumb(_href: string, _displayText: string) {
    this.breadcrumbsComp.add(_href, _displayText);
  }

}
