import { Injectable } from '@angular/core';
import { User } from './user';
import { LogService } from '../log.service';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

@Injectable()
// NOTE: For now, there is no DB so data is stored in memory only.
export class UsersService {

	log: LogService;

  // List of franchises
  users: User[] = [];
  private _observableList: BehaviorSubject<User[]> = new BehaviorSubject([]);
  get observableList(): Observable<User[]> {
    return this._observableList.asObservable()
  }

  constructor(private _logger:LogService) {
		this.log = _logger;
		this.log.info('UsersService.constructor() BEGIN');
	}

	loadUsersList() {
    this.log.info('UsersService.loadUsersList()');
    this.users = [];
    this.users.push(new User({
        user_pk: 1,
        username: "atlantatechie@gmail.com",
        first_name: "Mike",
        last_name: "Shoemake"}));
    this.users.push(new User({
        user_pk: 2,
        username: "mshoemake2@gmail.com",
        first_name: "Michelle",
        last_name: "Shoemake"}));
    this._observableList.next(this.users);
  }

  getUserByPK(_user_pk: number): User {
    for (let i = 0; i < this.users.length; i++) {
      let next: User = this.users[i];
      if (next.user_pk == _user_pk) {
        return next;
      }
    }
    throw new Error('Unable to find a user with the specified ID.');
  }

  getUser(_username: string): User {
    for (let i = 0; i < this.users.length; i++) {
      let next: User = this.users[i];
      if (next.username == _username) {
        return next;
      }
    }
    throw new Error('Unable to find a user with the specified username (' + _username + ').');
  }

  addUser(_user: User) {
    this.users.push(_user);
    this.sortList();
    this.log.info("Added user " + _user.username + ".");
    this.logUsersList();
  }

  sortList() {
    this.users.sort(this.sortBy("username", false, undefined));
    this.log.info("Sorted user list.");
    this.logUsersList();
  }

  sortBy(field: string, reverse: boolean, primer) {

    var key = primer ?
      function(x) {return primer(x[field])} :
      function(x) {return x[field]};

    let nReverse: number = !reverse ? 1 : -1;

    return function (a, b) {
      let result: number = 0;
      let valueA = key(a);
      let valueB = key(b);
      if (valueA > valueB) {
        result = 1;
      } else if (valueA < valueB) {
        result = -1;
      } else {
        result = 0;
      }
      console.log("   Sorting... " + valueA + ", " + valueB + "  result=" + result);

      return a = valueA, b = valueB, nReverse * result;
    }
  }

  logUsersList() {
    this.log.info("Users:");
    for (let i = 0; i < this.users.length; i++) {
      let next: User = this.users[i];
      this.log.info("   [" + (i+1) + "]:");
      this.log.info("      user_pk: " + next.user_pk);
      this.log.info("      username: " + next.username);
      this.log.info("      first_name: " + next.first_name);
      this.log.info("      last_name: " + next.last_name);
    }
  }
}
