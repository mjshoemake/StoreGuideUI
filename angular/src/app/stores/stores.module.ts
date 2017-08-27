import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
import { StoresRoutingModule, routedComponents } from './stores.routing';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Declarations
import { StoresComponent } from './stores.component';
import { StoresService } from './stores.service';

@NgModule({
  imports: [StoresRoutingModule,
            SharedModule,
            CommonModule,
            NgbModule],
  declarations: [routedComponents,
                 StoresComponent
                ],
  providers: [StoresService]
})
export class StoresModule { }
