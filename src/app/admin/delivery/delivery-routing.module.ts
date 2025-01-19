import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreadComponent } from './bread/bread.component';
import { DeliveryComponent } from './delivery.component';

const routes: Routes = [{
  path:'',
  component:DeliveryComponent
},
{
  path:':action',
  component:BreadComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryRoutingModule { }
