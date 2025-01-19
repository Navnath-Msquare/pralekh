import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LicenseComponent } from './license/license.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {path: 'license',loadChildren: () => import('./license/license.module').then(m => m.LicenseModule)},
  {path: 'enquiry',loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)},
  {path: 'details',loadChildren: () => import('./details/details.module').then(m => m.DetailsModule)},
  {
    path: 'service', loadChildren: () => import('./service/service.module').then(m => m.ServiceModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistributorRoutingModule { }
