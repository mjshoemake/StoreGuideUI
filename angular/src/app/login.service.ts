import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './login';
import { Logger } from 'angular2-logger/app/core/logger';
import { LogService } from './log.service';
import { ChangeDetectorRef } from '@angular/core';


// For Google Auth
declare let mapComponents: any;
declare const gapi: any;

/*
 * This service manages the authentication information of the logged in user (the session,
 * basically). This service uses two-way data binding to notify the UI when the logged-in
 * state changes.  Really the @Input part of it is unnecessary but I'm leaving it here as an
 * example for reference.
 */
@Injectable()
export class LoginService {

	log: LogService;
	private router: Router;

  loggedInUser: Login;
  loggedInValue: boolean = false;
  //headerChangeDetector: ChangeDetectorRef;
  private gapi: any;

  //@Output() loggedInChange = new EventEmitter();
  @Output() loggedInChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _logger:LogService, _router: Router) {
		this.log = _logger;
		this.router = _router;

    mapComponents.headerComp = this;

    this.log.info('LoginService.constructor()');
		if (this.router) {
		  this.log.info('LoginService.constructor() Router set properly.')
    } else {
		  this.log.info('LoginService.constructor() Router is null.')
    }
	}

	checkGoogleApi(_prefix: string) {
    if (this.gapi) {
      let msg = 'LoginService.' + _prefix + 'GoogleApi() gapi set properly. ';
      if (! this.gapi.auth2) {
/*
        this.gapi.load('auth2', () => {
          this.log.info('LoginService.' + _prefix + 'GoogleApi() -> auth2 loaded. Calling init()...');
          this.gapi.auth2.init();
        });
        this.log.info('LoginService.' + _prefix + 'GoogleApi() auth2 not found, attempted to load from Google...');
*/

        let loadGapiClient = new Promise((resolve, reject) => {
          try {
            this.gapi.load('auth2', resolve);
          } catch (e) {
            this.log.error(e.message + '   ' + e.stack);
          }
        });

        loadGapiClient.then(() => {
          // Success!!
          this.log.info('LoginService.' + _prefix + 'GoogleApi() -> auth2 loaded. Calling init()...');
          this.gapi.auth2.init();
          this.log.info('LoginService.' + _prefix + 'GoogleApi() -> auth2 loaded. Calling init()... done.');

          if (this.gapi.auth2) {
            msg += 'auth2 is ready.';
          } else {
            msg += 'auth2 is null!!!';
          }
          this.log.info(msg);
        },
        (reason) => {
          this.log.error('Error: failed to load Google API Auth2. ' + reason);
        });
      }
    } else {
      this.log.info('LoginService.' + _prefix + 'GoogleApi() gapi is null.')
    }
    let msg = 'LoginService.' + _prefix + 'GoogleApi() END';
  }

	getGoogleApi(): any {
    this.checkGoogleApi('get');
    return this.gapi;
  }

	setGoogleApi(_gapi: any) {
    if (this.gapi) {
      this.log.info('LoginService.setGoogleApi() Existing gapi instance found.  Replacing...');
    }
    this.gapi = _gapi;
    this.checkGoogleApi('set');
  }

  loggedInEvent(_id: string, _name: string, _firstName: string, _lastName: string, _imageUrl: string, _email: string) {
    this.log.info("HeaderComponent.loggedInEvent() name=" + _name);
    this.log.info("HeaderComponent.loggedInEvent() email=" + _email);
    this.saveLoggedInUser(_id, _name, _firstName, _lastName, _imageUrl, _email);
    this.gapi = gapi;
  }


  /*
      setHeaderChangeDetector(changeDetector: ChangeDetectorRef) {
      this.headerChangeDetector = changeDetector;
    }
  */

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
    this.log.info('LoginService.logout() BEGIN');
    if (this.getGoogleApi()) {
      let auth2: any = this.gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        console.log('User signed out.');
        if (this.router) {
          this.log.info('LoginService.logout() Router set properly.')
        } else {
          this.log.info('LoginService.logout() Router is null.')
        }
        this.log.info('LoginService.logout() Routing to /home...')
        this.router.navigate(['/home']);
        this.log.info('LoginService.logout() Routing to /home... DONE.')
        this.loggedIn = false;
        this.loggedInUser = undefined;
      });
    } else {
      this.log.info('LoginService.logout() gapi is null.')
    }
  }

  isStillLoggedIn(): boolean {
    this.log.info('LoginService.isStillLoggedIn() BEGIN');
    if (this.getGoogleApi()) {
      let auth2: any = this.gapi.auth2.getAuthInstance();
      if (auth2.isSignedIn.get()) {

        // User signed in.
        let profile = auth2.currentUser.get().getBasicProfile();
        let email = profile.getEmail();
        if (email != this.loggedInUser.email) {
          // Different user signed in.
          alert('Another Google user has signed in. Logging out of MapMyShop.');
          this.log.info('LoginService.isStillLoggedIn() Another Google user has signed in. Logging out of MapMyShop...');
          this.logout();
          return false;
        } else {
          this.log.info('LoginService.isStillLoggedIn() ->  Yes');
          return true;
        }
      } else {
        this.log.info('LoginService.isStillLoggedIn() ->  No');
        return false;
      }
    } else {
      this.log.error("LoginService.isStillLoggedIn() ERROR: Google API not initialized.");
      return false;
    }
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
      this.log.info('LoginService.saveLoggedInUser() Routing to /stores.');
      this.router.navigate(['/stores']);
    }
  }

}
