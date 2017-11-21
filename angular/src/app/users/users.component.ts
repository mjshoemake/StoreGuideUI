import {Component, Input, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Injectable } from '@angular/core';
import { LogService } from '../log.service';
import { LoginService } from '../login.service';
import { PageService } from '../page.service';
import { UsersService } from './users.service';
import { PageComponent } from '../page.component';
import { Subscription } from "rxjs/Subscription";
import { User } from "./user";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";

@Component({
	selector: 'users',
	templateUrl: './users.component.html',
 	styleUrls: []
})

@Injectable()
export class UsersComponent implements OnDestroy, OnInit {
  log: LogService;
  loginService: LoginService;
  pageService: PageService;
  usersService: UsersService;
  users: User[] = [];
  model: User = new User();

  @ViewChild('p') public addPopover: NgbPopover;
  @ViewChild('e') public editPopover: NgbPopover;

  // Data Binding From Service
  private usersSubscription: Subscription;

  // Constructor
	constructor(private _logger: LogService,
	            private _usersService: UsersService,
              private _loginService: LoginService,
              private _pageService: PageService,
              private _pageComp: PageComponent) {
		this.log = _logger;
		this.log.info('StoresComponent.constructor() BEGIN');
		this.usersService = _usersService;
    this.loginService = _loginService;
    this.pageService = _pageService;
    if (this.pageService.attemptToChangePage('Users', 'Manage your list of users (add, edit, remove, etc.).')) {
      // Set up page data.
      _pageComp.closeHamburgerMenu();
      this.log.info("UsersComponent.constructor()  Closed hamburger menu.");

      this.log.info("UsersComponent.constructor()  About to call clearAndAddBreadcrumb()...");
      _pageComp.clearAndAddBreadcrumb('/mapmyshop/#/users', 'Users');
    }
    this.log.info('UsersComponent.constructor()  END');
	}

  ngOnInit() {
    this.log.info('UsersComponent.ngOnInit() called.');
    this.init();
  }

  ngOnDestroy() {
    this.log.info('UsersComponent.ngOnDestroy() called.');
 	}

  prepareToAdd() {
    this.model = new User();
    if (this.addPopover) {
      this.addPopover.open();
      this.log.info("Opening Add popover.");
    }
    if (this.editPopover) {
      this.editPopover.close();
      this.log.info("Closing Edit popover.");
    }
  }

  prepareToEdit(_username: string) {
	  let user = this.usersService.getUser(_username);
    this.model.username = _username;
	  this.model.user_pk = user.user_pk;
	  this.model.first_name = user.first_name;
	  this.model.last_name = user.last_name;
	  this.model.image_url = user.image_url;
	  if (this.addPopover) {
	    this.addPopover.close();
	    this.log.info("Closing Add popover.");
    }
    if (this.editPopover) {
	    this.editPopover.open();
	    this.log.info("Opening Edit popover.");
    }
  }

  addSaveClicked() {
    this.usersService.addUser(this.model);
    this.clearModel();
  }

  clearModel() {
	  this.model = new User();
  }

  @Input('userList')
  get userList(): User[] {
    this.log.info('UsersComponent.userList() get value=' + this.users.length);
    return this.users;
  }

  addButtonClicked() {
    this.log.info('UsersComponent.addButtonClicked() BEGIN');
	  alert("Add Button Clicked.");
  }

  init() {
	  console.log('UsersComponent.init() called. Loading users list...');
    this.usersService.loadUsersList();

    this.log.info('UsersComponent.init() Subscribing to value changes...');
    this.usersSubscription = this.usersService.observableList.subscribe( value => {
      this.log.info('UsersComponent UserList observable event received... new value=' + value.length);
      this.users = value;
      this.usersService.logUsersList();
    });
  }
  // Data Binding From Service END
}
