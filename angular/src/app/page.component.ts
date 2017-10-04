//import { ChangeDetectorRef, Component, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { Component, Injectable } from '@angular/core';
import { LogService } from './log.service';
import {PageService} from "./page.service";
import { BrandIcon } from './brand-icon';
import { NavItem } from './nav-item';
import { NavItemService } from './nav-item.service';
import { HeaderComponent } from './header.component';
import {BreadcrumbsComponent} from "./shared/breadcrumbs.component";

@Component({
	selector: 'page',
	templateUrl: './page.component.html',
	providers: [BreadcrumbsComponent],
	styleUrls: []
})

@Injectable()
export class PageComponent  {
	pageName: string = '[[[PageName]]]';
	subTitle: string = '[[[SubTitle]]]';

/*
	pageNameValue: string = '[[[PageName]]]';
	subTitleValue: string = '[[[SubTitle]]]';

  @Input('pageName')
  get pageName():string {
    this.log.info('LoginService.pageName() get value=' + this.pageNameValue);
    return this.pageNameValue;
  }

  set pageName(_val: string) {
    this.pageNameValue = _val;
    this.log.info('LoginService.pageName() set value=' + this.pageNameValue);
    this.pageNameChange.emit(this.pageNameValue);
  }

  @Input('subTitle')
  get subTitle():string {
    this.log.info('LoginService.subTitle() get value=' + this.subTitleValue);
    return this.subTitleValue;
  }

  set subTitle(_val: string) {
    this.subTitleValue = _val;
    this.log.info('LoginService.subTitle() set value=' + this.subTitleValue);
    this.subTitleChange.emit(this.subTitleValue);
  }

  @Output() pageNameChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() subTitleChange: EventEmitter<string> = new EventEmitter<string>();

  // End 2-way binding
*/




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
	pageService: PageService;
	headerComp: HeaderComponent;
	breadcrumbsComp: BreadcrumbsComponent;
//	changeDetectorRef: ChangeDetectorRef;

	// Messages
	//alertMsg: string = 'Danger, Will Robinson!!  Danger!!';
	alertMsg: string = undefined;
	alertType: string = 'alert-success';

	log: LogService;

	constructor(private _logger: LogService,
              private _pageService: PageService,
//              private _ref: ChangeDetectorRef,
	            private _navItemService: NavItemService,
	            private _headerComp: HeaderComponent,
              private _breadcrumbsComp: BreadcrumbsComponent) {
    // Arguments
		this.log = _logger;
		this.navItemService = _navItemService;
		this.pageService = _pageService;
    this.headerComp = _headerComp;
    this.breadcrumbsComp = _breadcrumbsComp;
//		this.changeDetectorRef = _ref;

		this.log.debug('PageComponent.constructor() BEGIN');
		this.log.info('PageComponent.constructor() BEGIN');
    this.navItems = this.navItemService.getAll();
		this.log.info('PageComponent.constructor()    NavItem count=' + this.navItems.length);
	}

  ngOnInit() {
	  this.log.info('PageComponent.ngOnInit() Subscribing to value changes...')
    this.pageService.getPageNameObservable().subscribe( value => {
      this.log.info('PageComponent PageName observable event received... new value=' + value);
      this.pageName = value;
      this.log.info('PageComponent PageName observable event received... upodated -> ' + this.pageName);
    });
    this.pageService.getSubTitleObservable().subscribe( value => {
      this.log.info('PageComponent SubTitle observable event received... new value=' + value);
      this.subTitle = value;
      this.log.info('PageComponent SubTitle observable event received... updated -> ' + this.subTitle);
    });
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

  /*
    refresh() {
        this.changeDetectorRef.detectChanges();
    }
  */

}
