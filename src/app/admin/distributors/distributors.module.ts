import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistributorsRoutingModule } from './distributors-routing.module';
import { DistributorsComponent } from './distributors.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BreadComponent } from './bread/bread.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SimplebarAngularModule } from 'simplebar-angular';
import { DetailsComponent } from './details/details.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { PincodesComponent } from './pincodes/pincodes.component';


@NgModule({
  declarations: [
    DistributorsComponent,
    BreadComponent,
    DetailsComponent,
    PincodesComponent
  ],
  imports: [
    CommonModule,
    DistributorsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule,
    SimplebarAngularModule,
    FlatpickrModule.forRoot()
  ]
})
export class DistributorsModule { }
