import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { Role } from './core/models/role.module';
import { LayoutComponent } from './layouts/layout.component';

const routes: Routes = [
  { path:'',redirectTo:'admin',pathMatch: 'full'},
  { path: 'admin', component: LayoutComponent, loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),canActivate:[AuthGuard],data:{roles:Role.Admin}},
  { path: 'distributor', component: LayoutComponent, loadChildren: () => import('./distributor/distributor.module').then(m => m.DistributorModule),canActivate:[AuthGuard],data:{roles:Role.Distributor}},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
