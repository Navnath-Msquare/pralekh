import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialPackagesComponent } from './special-packages.component';

const routes: Routes = [
  {
    path:'',
    component:SpecialPackagesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialPackagesRoutingModule { }
