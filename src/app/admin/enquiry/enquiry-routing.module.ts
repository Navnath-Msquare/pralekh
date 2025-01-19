import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnquiryComponent } from './enquiry.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path:'',
    component:EnquiryComponent
  },
  {
    path:'view',
    component:ViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnquiryRoutingModule { }
