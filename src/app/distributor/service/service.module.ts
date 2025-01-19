import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service-routing.module';
import { PrivateComponent } from './private/private.component';
import { GovernmentComponent } from './government/government.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServicePackageComponent } from './service-package/service-package.component';
import { SubServiceComponent } from './sub-service/sub-service.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    PrivateComponent,
    GovernmentComponent,
    ServicePackageComponent,
    SubServiceComponent
  ],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule
  ]
})
export class ServiceModule { }
