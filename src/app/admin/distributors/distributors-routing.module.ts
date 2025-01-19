import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreadComponent } from './bread/bread.component';
import { DistributorsComponent } from './distributors.component';
import { DetailsComponent } from './details/details.component';
import { PincodesComponent } from './pincodes/pincodes.component';

const routes: Routes = [{
  path:'',
  component:DistributorsComponent
},
{
  path:':action',
  component:BreadComponent
},
{
  path:'details/:id',
  component:DetailsComponent
},
{
  path:'pincodes/:id',
  component:PincodesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistributorsRoutingModule { }
