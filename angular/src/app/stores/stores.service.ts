import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Logger } from 'angular2-logger/app/core/logger';
import { LogService } from '../log.service';

@Injectable()
// NOTE: For now, there is no DB so data is stored in memory only.
export class StoresService {

	log: LogService;

	constructor(private _logger:LogService) {
		this.log = _logger;
		this.log.debug('StoresService.constructor()');
	}

}
