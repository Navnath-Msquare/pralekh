import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryRoutingModule } from './delivery-routing.module';
import { DeliveryComponent } from './delivery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BreadComponent } from './bread/bread.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    DeliveryComponent,
    BreadComponent
  ],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule
  ]
})
export class DeliveryModule { }
