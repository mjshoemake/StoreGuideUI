import { Component, Injectable, Input } from '@angular/core';
import { LogService } from './log.service';
import { BrandIcon } from './brand-icon';
import { NavItem } from './nav-item';
import { LoginService } from './login.service';
//import { ChangeDetectorRef } from '@angular/core';

@Component({
	selector: 'appHeader',
	templateUrl: './header.component.html',
	styleUrls: []
})

@Injectable()
export class HeaderComponent {  // implements AfterViewInit {
	@Input() brandIcon = new BrandIcon({
			image: '',
			displayText: ''
		});
	@Input() headerDisplay: string = 'block';
	@Input() brandForename: string = 'Child';
	@Input() brandSurname: string = 'Brand';
	@Input() navItems: NavItem[] = [];

	// Manages the visibility of the navigation items
  displayNavItems: string = 'hidden';
  displaySignIn: string = 'display-block';
  displaySignOut: string = 'hidden';

  log: LogService;
  loginService: LoginService;
//  changeDetector: ChangeDetectorRef;
  loggedInUserId: string;


  // For Google Auth
  //public auth2: any;

//  constructor(private _logger: LogService, _loginService: LoginService, _changeDetector: ChangeDetectorRef) {
	constructor(private _logger: LogService, _loginService: LoginService) {
		this.log = _logger;
    this.log.info('HeaderComponent.constructor() BEGIN');

    try {
      throw new Error('What called this?');
    } catch (e) {
      this.log.error('   ' +e.name + ': ' + e.message + ' - ' + e.stack);
    }

		this.loginService = _loginService;
		//this.changeDetector = _changeDetector;
		//this.loginService.setHeaderChangeDetector(_changeDetector);

/*
		let googleAuthEnabled = false;
		try {
		  if (gapi) {
		    googleAuthEnabled = true;
      } // else false
    } catch (e) {
		  // false
    }
    if (googleAuthEnabled) {
      this.log.info('HeaderComponent.constructor() Calling loginService.setGoogleApi()...');
      this.loginService.setGoogleApi(gapi);
      this.log.info('HeaderComponent.constructor() Calling loginService.setGoogleApi()... done.');
    } else {
      this.log.error("HeaderComponent.constructor() ERROR: Google API not initialized.");
      this.log.info('HeaderComponent.constructor() gapi is null.');
*/
/*
      this.log.info('Logging in as guest.');
      this.loggedInEvent("guest",
        "Guest",
        "Guest",
        "",
        undefined,
        "crossewalk@gmail.com");
*/
//    }
		this.log.info('HeaderComponent.constructor()    NavItem count=' + this.navItems.length);
    this.log.info('HeaderComponent.constructor() END');
	}

  isStillLoggedIn(): boolean {
	  return this.loginService.isStillLoggedIn();
  }

/*
  logout() {
    this.log.info("HeaderComponent.logout()");
    if (gapi) {
      this.log.info('HeaderComponent.logout() gapi set properly.')
      this.loginService.setGoogleApi(gapi);
    } else {
      this.log.info('HeaderComponent.logout() gapi is null.')
    }
    this.loginService.logout();
    this.showLogin();
  }

  hideLogin() {
	  this.displayNavItems = 'display-inline';
//	  this.displaySignIn = 'hidden';
    this.displaySignIn = 'display-block';
	  this.displaySignOut = 'display-block';
    this.log.info("HeaderComponent.hideLogin()");
//    this.changeDetector.detectChanges();
  }

  showLogin() {
    this.displayNavItems = 'hidden';
    this.displaySignIn = 'display-block';
    this.displaySignOut = 'hidden';
    this.log.info("HeaderComponent.showLogin()");
//    this.changeDetector.detectChanges();
  }
*/
  closeHamburgerMenu() {
	  let button = document.getElementById('hamburgerButton');
	  let collapsible = document.getElementById('div-navbar-collapsible');
	  this.log.info('Collapsing menu after page change...');
	  if (button) {
	    button.className='navbar-toggle collapsed';
	    this.log.info('   HamburgerButton.class==' + button.className);
	  }
	  if (collapsible) {
	    collapsible.className='navbar-collapse collapse';
	    this.log.info('   CollapsibleDiv.class==' + button.className);
	  }
	}

/*
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '927947556211-s81ref651i2dkco6ml45ttdfs0q1viiv.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'https://www.googleapis.com/auth/admin.directory.user.security'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE


      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit(){
    this.googleInit();
  }
*/
}
