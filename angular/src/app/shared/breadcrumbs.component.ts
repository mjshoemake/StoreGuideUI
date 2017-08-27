import {ChangeDetectorRef, Component, Injectable, Input} from '@angular/core';
import { LogService } from '../log.service';
import { BreadcrumbsService } from './breadcrumbs.service';
import { Breadcrumb } from './breadcrumb';

@Component({
	selector: 'breadcrumbs',
	templateUrl: './breadcrumbs.component.html',
	styleUrls: []
})

@Injectable()
export class BreadcrumbsComponent  {
	log: LogService;
	breadcrumbsService: BreadcrumbsService;

	constructor(private _logger: LogService,
              private _ref: ChangeDetectorRef,
              private _breadcrumbsService: BreadcrumbsService ) {
		this.log = _logger;
		this.log.info('BreadcrumbsComponent.constructor() BEGIN');
		this.breadcrumbsService = _breadcrumbsService;
	}

  getAll(): Breadcrumb[] {
    return this.breadcrumbsService.getAll();
  }

  clear() {
	  this.breadcrumbsService.clear();
  }

  clearAndAdd(_href: string, _displayText: string) {
	  this.breadcrumbsService.clearAndAdd(_href, _displayText);
  }

  add(_href: string, _displayText: string) {
	  this.breadcrumbsService.add(_href, _displayText);
  }

}
