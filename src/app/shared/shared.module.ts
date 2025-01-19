import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FilterPipe } from '../core/pipes/filter.pipe';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    FilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [BreadcrumbsComponent,FilterPipe]
})
export class SharedModule { }
