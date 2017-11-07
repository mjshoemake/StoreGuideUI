// Imports
import {NgModule, isDevMode} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { StoresModule } from './stores/stores.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import {Logger, Options as LoggerOptions} from 'angular2-logger/app/core/logger';
import { environment } from '../environments/environment';

// Declarations
import { AppComponent } from './app.component';
import { MainComponent } from './main.component';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';
import { PageComponent } from './page.component';
import { LogService } from './log.service';
import { LoginService } from './login.service';
import { PageService } from './page.service';
import { NavItemService } from './nav-item.service';
import { routing } from './app.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {UsersModule} from "./users/users.module";

// Decorator
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    StoresModule,
    UsersModule,
    HomeModule,
    SharedModule,
    routing,
    NgbModule.forRoot()
  ],
  declarations: [
  	// Root declarations only
  	AppComponent,
  	MainComponent,
  	HeaderComponent,
  	FooterComponent,
  	PageComponent
  ],
  providers: [Logger, LogService, LoginService, PageService, NavItemService, HeaderComponent, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private logService: LogService) {
    if (isDevMode()) {
      console.info('AppModule.constructor() - To see debug logs enter: \'logger.level = logger.Level.DEBUG;\' in your browser console');
    }
    logService.setLogLevel(environment.logger.level);
    logService.info('AppModule.constructor() - Testing angular2_logger...');
  }
}
