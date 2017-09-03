import { Injectable, Output, EventEmitter } from '@angular/core';
import { Login } from './login';
import { Logger } from 'angular2-logger/app/core/logger';
import { LogService } from './log.service';

@Injectable()

/*
 * This service manages the authentication information of the logged in user (the session,
 * basically). This service uses two-way data binding to notify the UI when the logged-in
 * state changes.  Really the @Input part of it is unnecessary but I'm leaving it here as an
 * example for reference.
 */
export class LoginService {

	log: LogService;

  loggedInUser: Login;
  loggedInValue: boolean;
  @Output() loggedInChange = new EventEmitter();

  constructor(private _logger:LogService) {
		this.log = _logger;
		this.log.debug('LoginService.constructor()');
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

	//@Input
  //get loggedIn(): boolean {
  //  return this.loggedInValue;
  //}

  set loggedIn(_val: boolean) {
    this.loggedInValue = _val;
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
	  this.loggedInUser = undefined;
	  this.loggedIn = false;
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
    }
  }

}
