import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnquiryRoutingModule } from './enquiry-routing.module';
import { EnquiryComponent } from './enquiry.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewComponent } from './view/view.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { FlatpickrModule } from 'angularx-flatpickr';


@NgModule({
  declarations: [
    EnquiryComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    EnquiryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule,
    NgxMaskModule.forRoot(),
    FlatpickrModule.forRoot()
  ]
})
export class EnquiryModule { }
