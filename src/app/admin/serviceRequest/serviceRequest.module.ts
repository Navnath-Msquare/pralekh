import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRequestRoutingModule } from './serviceRequest-routing.module';
import { PrivateComponent } from './private/private.component';
import { GovernmentComponent } from './government/government.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PrivateComponent,
    GovernmentComponent
  ],
  imports: [
    CommonModule,
    ServiceRequestRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ServiceRequestModule { }
