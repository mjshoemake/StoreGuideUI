import { Injectable } from '@angular/core';
import { Franchise } from './franchise';
import { LogService } from '../log.service';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

@Injectable()
// NOTE: For now, there is no DB so data is stored in memory only.
export class StoresService {

	log: LogService;

  // List of franchises
  franchises: Franchise[] = [];
  private _observableList: BehaviorSubject<Franchise[]> = new BehaviorSubject([]);
  get observableList(): Observable<Franchise[]> { return this._observableList.asObservable() }

  constructor(private _logger:LogService) {
		this.log = _logger;
		this.log.debug('StoresService.constructor() BEGIN');
		this.createDummyData();
	}

	createDummyData() {
    this.franchises.push(new Franchise({
        franchise_pk: 1,
        name: "Kroger",
        website: "http://www.kroger.com",
        company_email: "support@kroger.com"}));
    this.franchises.push(new Franchise({
        franchise_pk: 2,
        name: "Publix",
        website: "http://www.publix.com",
        company_email: "support@publix.com"}));
    this.franchises.push(new Franchise({
        franchise_pk: 3,
        name: "Target",
        website: "http://www.target.com",
        company_email: "support@target.com"}));
    this.franchises.push(new Franchise({
        franchise_pk: 4,
        name: "Wal-Mart",
        website: "http://www.walmart.com",
        company_email: "support@walmart.com"}));
    this._observableList.next(this.franchises);
  }

}
