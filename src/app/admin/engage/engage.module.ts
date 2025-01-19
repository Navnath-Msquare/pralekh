import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngageRoutingModule } from './engage-routing.module';
import { NotificationsComponent } from './notifications/notifications.component';


@NgModule({
  declarations: [
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    EngageRoutingModule
  ]
})
export class EngageModule { }
