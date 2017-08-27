import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Declarations
import { CollapsiblePanelComponent } from './collapsible-panel.component';
import { CollapsibleSubPanelComponent } from './collapsible-sub-panel.component';
import { TitledPanelComponent } from './titled-panel.component';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { BreadcrumbsService } from './breadcrumbs.service';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
  	CollapsiblePanelComponent,
  	CollapsibleSubPanelComponent,
  	TitledPanelComponent,
    BreadcrumbsComponent
  ],
  providers: [BreadcrumbsService],
  exports: [
  	CollapsiblePanelComponent,
  	CollapsibleSubPanelComponent,
  	TitledPanelComponent,
    BreadcrumbsComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
