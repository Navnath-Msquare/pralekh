import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewComponent } from './view/view.component';
import { FlatpickrModule } from 'angularx-flatpickr';


@NgModule({
  declarations: [
    CustomerComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule,
    FlatpickrModule.forRoot()
  ]
})
export class CustomerModule { }
