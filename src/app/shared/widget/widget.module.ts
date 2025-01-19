import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbTooltipModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { CountToModule } from 'angular-count-to';
// Feather Icon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
// Apex Chart Package
import { NgApexchartsModule } from 'ng-apexcharts';

import { BestSellingComponent } from './dashboard/best-selling/best-selling.component';
import { TopSellingComponent } from './dashboard/top-selling/top-selling.component';
import { RecentOrdersComponent } from './dashboard/recent-orders/recent-orders.component';
import { StatComponent } from './dashboard/stat/stat.component';


import { CrmStatComponent } from './crm/crm-stat/crm-stat.component';
import { DealsStatusComponent } from './crm/deals-status/deals-status.component';
import { UpcomingActivitiesComponent } from './crm/upcoming-activities/upcoming-activities.component';
import { ClosingDealsComponent } from './crm/closing-deals/closing-deals.component';

import { ProjectsStatComponent } from './projects/projects-stat/projects-stat.component';
import { ActiveProjectComponent } from './projects/active-project/active-project.component';
import { MyTaskComponent } from './projects/my-task/my-task.component';
import { TeamMembersComponent } from './projects/team-members/team-members.component';

@NgModule({
  declarations: [
    BestSellingComponent,
    TopSellingComponent,
    RecentOrdersComponent,
    StatComponent,
    CrmStatComponent,
    DealsStatusComponent,
    UpcomingActivitiesComponent,
    ClosingDealsComponent,
    ProjectsStatComponent,
    ActiveProjectComponent,
    MyTaskComponent,
    TeamMembersComponent
  ],
  imports: [
    CommonModule,
    NgbTooltipModule,
    NgbProgressbarModule,
    CountToModule,
    FeatherModule.pick(allIcons),
    NgApexchartsModule,
  ],
  exports: [BestSellingComponent, TopSellingComponent, RecentOrdersComponent, StatComponent, CrmStatComponent,
    DealsStatusComponent,
    UpcomingActivitiesComponent,
    ClosingDealsComponent,
    ProjectsStatComponent,
    ActiveProjectComponent,
    MyTaskComponent,
    TeamMembersComponent]
})
export class WidgetModule { }
