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
  pageComp: PageComponent;
  users: User[] = [];
  model: User = new User();
  popoverInstructions: string;
  editing: boolean;
  popoverTitle: string;

  @ViewChild('p') public popover: NgbPopover;

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
    this.pageComp = _pageComp;
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
    if (this.popover) {
      this.popover.close();
      this.model = new User();
      this.editing = false;
      this.popoverInstructions = "Add User: Please enter the properties of the user you would like to add and click the \"Save\" button.";
      this.popover.open();
      this.pageComp.closeAlert();
    }
  }

  prepareToEdit(_username: string) {
    if (this.popover) {
      this.popover.close();
      let user = this.usersService.getUser(_username);
      this.model.username = _username;
      this.model.user_pk = user.user_pk;
      this.model.first_name = user.first_name;
      this.model.last_name = user.last_name;
      this.model.image_url = user.image_url;
      this.popoverInstructions = "Edit User: Please update the selected user's properties and click the \"Save\" button.";
      this.editing = true;
      this.popover.open();
      this.pageComp.closeAlert();
    }
  }

  saveClicked() {
	  if (this.editing) {
      this.editSaveClicked();
    } else {
      this.addSaveClicked();
    }
  }

  deleteClicked() {
    this.usersService.deleteUser(this.model);
    this.pageComp.showAlert("success", "User " + this.model.first_name + " " + this.model.last_name + " was deleted successfully.");
    this.clearModel();
    this.popover.close();
  }

  private addSaveClicked() {
    this.usersService.addUser(this.model);
    this.pageComp.showAlert("success", "User " + this.model.first_name + " " + this.model.last_name + " was added successfully.");
    this.clearModel();
  }

  private editSaveClicked() {
	  this.usersService.updateUser(this.model);
    this.pageComp.showAlert("success", "User " + this.model.first_name + " " + this.model.last_name + " was updated successfully.");
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
