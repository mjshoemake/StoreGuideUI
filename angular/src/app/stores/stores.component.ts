import {ChangeDetectorRef, Component, Input, OnInit, OnDestroy} from '@angular/core';
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
  changeDetectorRef: ChangeDetectorRef;
  franchises: Franchise[] = [];

  // Data Binding From Service
  private myStoresSubscription: Subscription;
  testValue: string = "Initial value.";

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
              private _ref: ChangeDetectorRef,
	            private _storesService: StoresService,
              private _loginService: LoginService,
              private _pageService: PageService,
              private _pageComp: PageComponent) {
		this.log = _logger;
		this.log.info('StoresComponent.constructor() BEGIN');
		this.storesService = _storesService;
    this.loginService = _loginService;
    this.pageService = _pageService;
    this.changeDetectorRef = _ref;
    if (! this.changeDetectorRef) {
      this.log.info("StoresComponent.constructor()  ChangeDetectorRef == null!!!");
    }
    if (this.pageService.attemptToChangePage('Stores', 'Select a store and start mapping your way to a better shopping experience! Let us know what you\'re looking for and we\'ll help you find it quickly and efficiently.')) {
      // Set up page data.
      this.log.info("StoresComponent.constructor()  Closing hamburger menu...");
      _pageComp.closeHamburgerMenu();
      this.log.info("StoresComponent.constructor()  Closing hamburger menu... Done.");

      this.log.info("StoresComponent.constructor()  About to call clearAndAddBreadcrumb()...");
      //_pageComp.clearAndAddBreadcrumb('/stores', 'My Stores')
      _pageComp.clearAndAddBreadcrumb('/mapmyshop/#/stores', 'My Stores');
//      _pageComp.refresh();
    }
    this.log.info('StoresComponent.constructor()  END');
	}

  ngOnInit() {
	  console.log('StoresComponent.ngOnInit() called.');
    //this.log.info('StoresComponent.ngOnInit() called.');
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
	  this.testValue = 'Initialized.';
	  console.log('StoresComponent.init() called. Writing to this.log.info()....')
    this.log.info('StoresComponent.init() Subscribing to value changes...');
    this.storesService.loadStoresList();

    //this.changeDetectorRef.detectChanges();
    this.myStoresSubscription = this.storesService.observableList.subscribe( value => {
      this.log.info('StoresComponent StoresList observable event received... new value=' + value.length);
      this.franchises = value;
      this.storesService.logStoresList();
      this.log.info('StoresComponent StoreesList observable event received... Calling detectChanges()...');
      if (this.changeDetectorRef == undefined || this.changeDetectorRef == null) {
        this.log.info("StoreComponent.constructor()  ChangeDetectorRef == null!!!");
      } else {
        this.log.info("StoreComponent.constructor()  ChangeDetectorRef == " + this.changeDetectorRef);
      }
      //this.changeDetectorRef.detectChanges();
      this.log.info('StoresComponent StoreesList observable event received... Calling detectChanges()... Done.');
    });
  }
  // Data Binding From Service END

  refresh() {
    //this.changeDetectorRef.detectChanges();
  }
}
