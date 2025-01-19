import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GovernmentComponent } from './government/government.component';
import { PrivateComponent } from './private/private.component';

const routes: Routes = [
  {
    path:'private',
    component:PrivateComponent
  },
  {
    path:'government',
    component:GovernmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRequestRoutingModule { }
