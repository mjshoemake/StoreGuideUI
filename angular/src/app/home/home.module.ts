import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
import { HomeRoutingModule, routedComponents } from './home.routing';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Declarations
import {HomeComponent} from "./home.component";

@NgModule({
  imports: [HomeRoutingModule,
            SharedModule,
            CommonModule,
            NgbModule],
  declarations: [routedComponents,
                 HomeComponent
                ]
})
export class HomeModule { }
