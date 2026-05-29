import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './categories.component';
import { BreadComponent } from './bread/bread.component';

const routes: Routes = [
  { path: '', component: CategoriesComponent },
  { path: 'create', component: BreadComponent },
  { path: 'edit/:id', component: BreadComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
