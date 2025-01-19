import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GovernmentComponent } from './government/government.component';
import { PrivateComponent } from './private/private.component';
import { ServicePackageComponent } from './service-package/service-package.component';
import { SubServiceComponent } from './sub-service/sub-service.component';

const routes: Routes = [
  {
    path:'private',
    component:PrivateComponent
  },
  {
    path:'government',
    component:GovernmentComponent
  },
  {
    path:'subService',
    component:SubServiceComponent
  },
  {
    path:'servicePackage',
    component:ServicePackageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
