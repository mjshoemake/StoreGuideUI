import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import { Injectable } from '@angular/core';
import { LogService } from '../log.service';
import { LoginService } from '../login.service';
import { PageService } from '../page.service';
import {StoresService } from './stores.service';
import { PageComponent } from '../page.component';
import {Subscription} from "rxjs/Subscription";
import {Franchise} from "./franchise";

@Component({
	selector: 'stores',
	templateUrl: './stores.component.html',
 	styleUrls: []
})

@Injectable()
export class StoresComponent implements OnDestroy, OnInit {
  log: LogService;
  loginService: LoginService;
  pageService: PageService;
  storesService: StoresService;
  franchises: Franchise[] = [];

  // Data Binding From Service
  private myStoresSubscription: Subscription;

  // Constructor
	constructor(private _logger: LogService,
	            private _storesService: StoresService,
              private _loginService: LoginService,
              private _pageService: PageService,
              private _pageComp: PageComponent) {
		this.log = _logger;
		this.log.info('StoresComponent.constructor() BEGIN');
		this.storesService = _storesService;
    this.loginService = _loginService;
    this.pageService = _pageService;
    if (this.pageService.attemptToChangePage('Stores', 'Select a store and start mapping your way to a better shopping experience! Let us know what you\'re looking for and we\'ll help you find it quickly and efficiently.')) {
      // Set up page data.
      _pageComp.closeHamburgerMenu();
      this.log.info("StoresComponent.constructor()  Closed hamburger menu.");

      this.log.info("StoresComponent.constructor()  About to call clearAndAddBreadcrumb()...");
      _pageComp.clearAndAddBreadcrumb('/mapmyshop/#/stores', 'My Stores');
    }
    this.log.info('StoresComponent.constructor()  END');
	}

  ngOnInit() {
    this.log.info('StoresComponent.ngOnInit() called.');
    this.init();
  }

  ngOnDestroy() {
    this.log.info('StoresComponent.ngOnDestroy() called.');
 	}

  @Input('franchiseList')
  get franchiseList(): Franchise[] {
    this.log.info('StoresComponent.franchiseList() get value=' + this.franchises.length);
    return this.franchises;
  }

  init() {
	  console.log('StoresComponent.init() called. Loading stores list...');
    this.storesService.loadStoresList();

    this.log.info('StoresComponent.init() Subscribing to value changes...');
    this.myStoresSubscription = this.storesService.observableList.subscribe( value => {
      this.log.info('StoresComponent StoresList observable event received... new value=' + value.length);
      this.franchises = value;
      this.storesService.logStoresList();
    });
  }
  // Data Binding From Service END
}
