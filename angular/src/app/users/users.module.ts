import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
import {UsersRoutingModule, routedComponents} from './users.routing';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Declarations
import { UsersComponent } from './users.component';
import { UsersService } from './users.service';

@NgModule({
  imports: [UsersRoutingModule,
            SharedModule,
            CommonModule,
            NgbModule],
  declarations: [routedComponents,
                 UsersComponent
                ],
  providers: [UsersService]
})
export class UsersModule { }
