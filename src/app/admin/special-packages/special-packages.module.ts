import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialPackagesRoutingModule } from './special-packages-routing.module';
import { SpecialPackagesComponent } from './special-packages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SpecialPackagesComponent
  ],
  imports: [
    CommonModule,
    SpecialPackagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule
  ]
})
export class SpecialPackagesModule { }
