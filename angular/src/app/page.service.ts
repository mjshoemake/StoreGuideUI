import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { LogService } from './log.service';
import {Observable} from "rxjs/Observable";
import {LoginService} from "./login.service";

@Injectable()

/*
 * This service manages the information about the current page (name, subtitle, etc.).
 * It is primarily used by the PageCompnent.
 */
export class PageService {

	log: LogService;
	loginService: LoginService;

  constructor(private _logger: LogService,
              private _loginService: LoginService) {
		this.log = _logger;
    this.loginService = _loginService;
    this.log.info('PageService.constructor()');
	}

	// Name
  pageNameValue: string = '[PageName]';
  private pageNameSubject = new Subject<any>();
  getPageName(): string {
    return this.pageNameValue;
  }
  setPageName(_value: string) {
    this.pageNameValue = _value;
    this.log.info('PageService.setPageName("' + _value + '")  Firing event...');
    this.pageNameSubject.next(_value);
  }
  getPageNameObservable(): Observable<any> {
    return this.pageNameSubject.asObservable();
  }

  // Sub-Title
  subTitleValue: string = '[SubTitle]';
  private subTitleSubject = new Subject<any>();
  getSubTitle(): string {
    return this.subTitleValue;
  }
  setSubTitle(_value: string) {
    this.subTitleValue = _value;
    this.log.info('PageService.setSubTitle("' + _value + '")  Firing event...');
    this.subTitleSubject.next(_value);
  }
  getSubTitleObservable(): Observable<any> {
    return this.subTitleSubject.asObservable();
  }

  // Change the page title and sub-title.
  attemptToChangePage(_pageName: string, _subTitle: string): boolean {
    this.log.info('PageService.attemptToChangePage() Updating page data.');
    this.setPageName(_pageName);
    this.setSubTitle(_subTitle);
    return true;
  }

}
