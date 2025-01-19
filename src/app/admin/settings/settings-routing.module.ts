import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { BannerComponent } from './banner/banner.component';

const routes: Routes = [
  {
    path:'company',
    component:CompanyComponent
  },
  {
    path:'banner',
    component:BannerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
