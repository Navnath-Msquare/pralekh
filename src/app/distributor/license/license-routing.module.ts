import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LicenseComponent } from './license.component';
import { PurchaseComponent } from './purchase/purchase.component';

const routes: Routes = [
  {
    path:'',
    component:LicenseComponent
  },
  {
    path:'purchase',
    component:PurchaseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenseRoutingModule { }
