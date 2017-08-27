import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Breadcrumb } from './breadcrumb';
import { Logger } from 'angular2-logger/app/core/logger';
import { LogService } from '../log.service';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

@Injectable()
// NOTE: For now, there is no DB so data is stored
// in memory only.
export class BreadcrumbsService {

	log: LogService;

  // List of breadcrumbs
  breadcrumbs: Breadcrumb[] = [];
  private _observableList: BehaviorSubject<Breadcrumb[]> = new BehaviorSubject([]);
  get observableList(): Observable<Breadcrumb[]> { return this._observableList.asObservable() }


  constructor(private _logger:LogService) {
    this.log = _logger;
    this.log.info('BreadcrumbsService.constructor()');
  }

	getAll(): Breadcrumb[] {
		this.log.info('BreadcrumbsService.getAll() count=' + this.breadcrumbs.length);
		return this.breadcrumbs;
	}

	clear() {
	  this.breadcrumbs = [];
    this._observableList.next(this.breadcrumbs);
    this.log.info('BreadcrumbsService.clear() count=' + this.breadcrumbs.length);
    this.logBreadcrumbs();
  }

  clearAndAdd(_href: string, _displayText: string) {
    this.breadcrumbs = [];
    this.breadcrumbs.push(new Breadcrumb(
      {href: _href,
       displayText: _displayText}
    ));
    this._observableList.next(this.breadcrumbs);
    this.log.info("BreadcrumbsService.clearAndAdd(href='" + _href + "', displayText='" + _displayText  + "') count=" + this.breadcrumbs.length);
    this.logBreadcrumbs();
  }

  add(_href: string, _displayText: string) {
	  let found: boolean = false;
	  let newlist: Breadcrumb[] = [];
	  let i: number = 0;

    for (i = 0; i < this.breadcrumbs.length; i++) {
      let next: Breadcrumb = this.breadcrumbs[i];
      if (found) {
        // Ignore this item. We're done adding items. The rest can go away.
      } else if (next.href == _href) {
        found = true;
        newlist.push(next);
      } else {
        newlist.push(next);
      }
    }
    if (! found) {
	    newlist.push(new Breadcrumb(
        {href: _href,
         displayText: _displayText}
      ));
    }
    this.breadcrumbs = newlist;
    this._observableList.next(this.breadcrumbs);
    this.log.info("BreadcrumbsService.add(href='" + _href + "', displayText='" + _displayText  + "') count=" + this.breadcrumbs.length);
    this.logBreadcrumbs();
  }

  logBreadcrumbs() {
    this.log.info("Breadcrumbs:");
    for (let i = 0; i < this.breadcrumbs.length; i++) {
      let next: Breadcrumb = this.breadcrumbs[i];
      this.log.info("   [" + (i+1) + "]:");
      this.log.info("      href: " + next.href)
      this.log.info("      caption: " + next.displayText)
    }
  }
}
