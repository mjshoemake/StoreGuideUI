import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './login';
import { Logger } from 'angular2-logger/app/core/logger';
import { LogService } from './log.service';
import { ChangeDetectorRef } from '@angular/core';

@Injectable()

/*
 * This service manages the authentication information of the logged in user (the session,
 * basically). This service uses two-way data binding to notify the UI when the logged-in
 * state changes.  Really the @Input part of it is unnecessary but I'm leaving it here as an
 * example for reference.
 */
export class LoginService {

	log: LogService;
	private router: Router;

  loggedInUser: Login;
  loggedInValue: boolean = false;
  headerChangeDetector: ChangeDetectorRef;
  gapi: any;


  //@Output() loggedInChange = new EventEmitter();
  @Output() loggedInChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _logger:LogService, _router: Router) {
		this.log = _logger;
		this.router = _router;
    this.log.debug('LoginService.constructor()');
		if (this.router) {
		  this.log.info('LoginService.constructor() Router set properly.')
    } else {
		  this.log.info('LoginService.constructor() Router is null.')
    }
	}

	setGoogleApi(_gapi: any) {
    this.gapi = _gapi;
    if (this.gapi) {
      this.log.info('LoginService.setGoogleApi() gapi set properly.')
    } else {
      this.log.info('LoginService.setGoogleApi() gapi is null.')
    }
  }

	setHeaderChangeDetector(changeDetector: ChangeDetectorRef) {
    this.headerChangeDetector = changeDetector;
  }

	getLoginId(): string {
	  if (this.loggedInUser != null) {
      this.log.debug('LoginService.getLoginId() value=' + this.loggedInUser.email);
      return this.loggedInUser.email;
    } else {
	    this.log.info('LoginService.getLoginId() User NOT logged in.');
      return undefined;
    }
	}

	@Input('loggedIn')
  get loggedIn():boolean {
    this.log.info('LoginService.loggedIn() get value=' + this.loggedInValue);
    return this.loggedInValue;
  }

  set loggedIn(_val: boolean) {
    this.loggedInValue = _val;
    this.log.info('LoginService.loggedIn() set value=' + this.loggedInValue);
    this.loggedInChange.emit(this.loggedInValue);
  }

  getLoggedInUser(): Login {
    if (this.loggedInUser != null) {
      this.log.debug('LoginService.getLoggedIdUser() ID=' + this.loggedInUser.email);
      return this.loggedInUser;
    } else {
      this.log.info('LoginService.getLoginId() User NOT logged in.');
      return undefined;
    }
  }

  logout() {
    if (this.gapi) {
      this.log.info('LoginService.logout() gapi set properly.')
    } else {
      this.log.info('LoginService.logout() gapi is null.')
    }
    let auth2: any = this.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('User signed out.');
      if (this.router) {
        this.log.info('LoginService.logout() Router set properly.')
      } else {
        this.log.info('LoginService.logout() Router is null.')
      }
      this.router.navigate(['/home']);
      this.loggedIn = false;
      this.loggedInUser = undefined;
      if (this.headerChangeDetector) {
        this.headerChangeDetector.detectChanges();
      }
    });
  }

  saveLoggedInUser(_id: string, _name: string, _firstName: string, _lastName: string, _imageUrl: string, _email: string) {
    if (_email == null) {
      this.loggedInUser = undefined;
      this.loggedIn = false;
      this.log.error('LoginService.saveLoggedInUser() ERROR: login email address is null.');
	  } else {
      this.loggedInUser = new Login({id: _id, name: _name, firstName: _firstName, lastName: _lastName, imageUrl: _imageUrl, email: _email});
      this.loggedIn = true;
      this.log.info('LoginService.saveLoggedInUser() User successfully logged in (' + _email + ').');
      if (this.headerChangeDetector) {
        this.headerChangeDetector.detectChanges();
      }
    }
  }

}
