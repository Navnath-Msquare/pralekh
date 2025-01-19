import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [{
  path:'',
  component:CustomerComponent
},
{
  path:'view',
  component:ViewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
