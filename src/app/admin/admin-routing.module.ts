import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeliveryPartnerComponent } from './delivery-partner/delivery-partner.component';

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
  {
    path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
  },
  {
    path: 'distributors', loadChildren: () => import('./distributors/distributors.module').then(m => m.DistributorsModule)
  },
  {
    path: 'delivery', loadChildren: () => import('./delivery/delivery.module').then(m => m.DeliveryModule)
  },
  {
    path: 'delivery-partner', component:DeliveryPartnerComponent
  },
  {
    path: 'leads', loadChildren: () => import('./leads/leads.module').then(m => m.LeadsModule)
  },
  {
    path: 'engage', loadChildren: () => import('./engage/engage.module').then(m => m.EngageModule)
  },
  {
    path: 'plans', loadChildren: () => import('./plans/plans.module').then(m => m.PlansModule)
  },
  {
    path: 'service', loadChildren: () => import('./service/service.module').then(m => m.ServiceModule)
  },
  {
    path: 'special-packages', loadChildren: () => import('./special-packages/special-packages.module').then(m => m.SpecialPackagesModule)
  },
  {
    path: 'serviceRequest', loadChildren: () => import('./serviceRequest/serviceRequest.module').then(m => m.ServiceRequestModule)
  },
  {
    path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'enquiry', loadChildren: () => import('./enquiry/enquiry.module').then(m => m.EnquiryModule)
  },
  {
    path: 'license', loadChildren: () => import('./license/license.module').then(m => m.LicenseModule)
  },
  {
    path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path: 'area', loadChildren: () => import('./area/area.module').then(m => m.AreaModule)
  },
  {
    path: 'support', loadChildren: () => import('./support/support.module').then(m => m.SupportModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
