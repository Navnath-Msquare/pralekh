import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicenseRoutingModule } from './license-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PurchaseComponent } from './purchase/purchase.component';
import { LicenseComponent } from './license.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    PurchaseComponent,
    LicenseComponent
  ],
  imports: [
    CommonModule,
    LicenseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule,
  ]
})
export class LicenseModule { }
