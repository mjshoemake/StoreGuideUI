import {Component, EventEmitter, Injectable, Input, Output} from '@angular/core';
import { Logger } from 'angular2-logger/app/core/logger';
import { LogService } from '../log.service';

@Component({
	selector: 'titledPanel',
	templateUrl: './titled-panel.component.html',
	styleUrls: []
})

@Injectable()
export class TitledPanelComponent  {
	@Input() panelStyle: string = '';
	@Input() title: string = '[TitledPanel Title]';
	@Input() addEnabled: boolean = false;
  @Output() addClicked:EventEmitter<string> = new EventEmitter();

	log: LogService;

	constructor(private _logger: LogService) {
		this.log = _logger;
		this.log.info('TiledPanel.constructor() BEGIN');
	}

  addButtonClicked() {
    this.log.info('TiledPanel.addButtonClicked() BEGIN');
    this.addClicked.emit('add clicked');
  }
}
