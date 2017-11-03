//import { ChangeDetectorRef, Component, Injectable, Input, Output, EventEmitter } from '@angular/core';
import {ChangeDetectorRef, Component, Injectable, Input, OnInit, OnDestroy} from '@angular/core';
import { LogService } from './log.service';
import {PageService} from "./page.service";
import { BrandIcon } from './brand-icon';
import { NavItem } from './nav-item';
import { NavItemService } from './nav-item.service';
import { HeaderComponent } from './header.component';
import {BreadcrumbsComponent} from "./shared/breadcrumbs.component";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  providers: [BreadcrumbsComponent],
  styleUrls: []
})

@Injectable()
export class PageComponent implements OnDestroy, OnInit {
  pageName: string = '[[[PageName]]]';
  subTitle: string = '[[[SubTitle]]]';
  brandForename: string = 'Map My Shop';
  brandSurname: string = '';
  brandIcon = new BrandIcon({
    image: 'assets/images/treasure-map2-640.png',
    displayText: 'Map My Shop'
  });
  navItems: NavItem[] = []

  // Messages
  alertMsg: string = 'Danger, Will Robinson!!  Danger!!';
  //alertMsg: string = undefined;
  alertType: string = 'alert-success';

  // Preferences
  showBreadcrumbs: boolean = true;
  showHint: boolean = true;
  headerDisplay: string = 'block';

  // Dependencies
  navItemService: NavItemService;
  pageService: PageService;
  headerComp: HeaderComponent;
  breadcrumbsComp: BreadcrumbsComponent;
  changeDetectorRef: ChangeDetectorRef;

  log: LogService;

  constructor(private _logger: LogService,
              private _pageService: PageService,
              private _ref: ChangeDetectorRef,
              private _navItemService: NavItemService,
              private _headerComp: HeaderComponent,
              private _breadcrumbsComp: BreadcrumbsComponent) {
    // Arguments
    this.log = _logger;
    this.navItemService = _navItemService;
    this.pageService = _pageService;
    this.headerComp = _headerComp;
    this.breadcrumbsComp = _breadcrumbsComp;
    this.changeDetectorRef = _ref;

    this.log.info('PageComponent.constructor() BEGIN');
    this.log.info('PageComponent.constructor() ChangeDetectorRef=' + this.changeDetectorRef);
    this.navItems = this.navItemService.getAll();
    this.log.info('PageComponent.constructor()    NavItem count=' + this.navItems.length);
  }


  // Data Binding From Service
  private pageNameSubscription: Subscription;
  private subTitleSubscription: Subscription;
  private myStoresSubscription: Subscription;

  ngOnDestroy() {
    this.pageNameSubscription.unsubscribe();
    this.subTitleSubscription.unsubscribe();
    this.myStoresSubscription.unsubscribe();
  }

  ngOnInit() {
    this.log.info('PageComponent.ngOnInit() Subscribing to value changes...')
    this.pageNameSubscription = this.pageService.getPageNameObservable().subscribe( value => {
      this.log.info('PageComponent PageName observable event received... new value=' + value);
      this.pageName = value;
      this.changeDetectorRef.detectChanges();
      this.log.info('PageComponent PageName observable event received... upodated -> ' + this.pageName);
    });
    this.subTitleSubscription = this.pageService.getSubTitleObservable().subscribe( value => {
      this.log.info('PageComponent SubTitle observable event received... new value=' + value);
      this.subTitle = value;
      this.changeDetectorRef.detectChanges();
      this.log.info('PageComponent SubTitle observable event received... updated -> ' + this.subTitle);
    });
  }
  // Data Binding From Service END


  closeHamburgerMenu() {
    this.headerComp.closeHamburgerMenu();
  }

  clearBreadcrumbs() {
    this.breadcrumbsComp.clear();
    this.changeDetectorRef.detectChanges();
  }

  clearAndAddBreadcrumb(_href: string, _displayText: string) {
    this.log.info("PageComponent.clearAndAdd(href='" + _href + "', displayText='" + _displayText  + "')");
    this.breadcrumbsComp.clearAndAdd(_href, _displayText);
    this.changeDetectorRef.detectChanges();
  }

  addBreadcrumb(_href: string, _displayText: string) {
    this.breadcrumbsComp.add(_href, _displayText);
    this.changeDetectorRef.detectChanges();
  }

}
