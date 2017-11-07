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
    this.log.info('UsersService.observableList() get  User list size=' + this.users.length);
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
