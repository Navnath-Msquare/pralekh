import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreadComponent } from './bread/bread.component';
import { PlansComponent } from './plans.component';

const routes: Routes = [
  {
    path:'',
    component:PlansComponent
  },
  {
    path:':action',
    component:BreadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansRoutingModule { }
